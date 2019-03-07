<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :left-text=left
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight(resume.id)"
        :fixed=fix
      >
        <van-icon name="like-o" slot="right" v-show="resume.flag == 0"/>
        <van-icon name="like" slot="right" v-show="resume.flag == 1"/>
      </van-nav-bar>
      <div class="resume-header inner-box">
        <van-row>
          <van-col v-if="resume.log !== '' " span="4" >
            <img class="company-logo" :src='resume.url + resume.log' alt="">
          </van-col>
          <van-col  span="4" v-else>
            <img class="company-logo" src="../../../static/images/person.png" alt="" >
          </van-col>
          <van-col span="19" offset="1">
            <van-row>
              <van-col span="24"><p class="p-name">{{resume.name}}</p></van-col>
            </van-row>
            <van-row>
              <van-col span="24"><p>
                <span v-if="resume.sex == 1">男</span><span v-else>女</span> | <span>{{experience.c_name}}</span> | <span>{{education.c_name}}</span> | <span>{{nat.c_name}}</span>
              </p></van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>

      <div class="company-content inner-box" v-show="this.resume.tag !== null">
        <p class="title">{{$t('common.tags')}}</p>
        <van-row class="p-lines" v-show="tags !== ''">
          <p class="p-tags" ><span v-for="item in tags" >{{item}}</span></p>
        </van-row>
      </div>

      <div class="company-content inner-box" v-show="this.resume.describe !== null">
        <p class="title">{{$t('common.selfEvaluation')}}</p>
        <van-row class="p-line">
          <van-col span="24"><p>{{resume.describe}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box">
        <p class="title">{{$t('company.contactInformation')}}</p>
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.phone')}}：</p></van-col>
          <van-col span="8" offset="8"><p class="right-van">{{phone}}</p></van-col>
        </van-row>
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.email')}}：</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">{{resume.email}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box">
        <p class="title">{{$t('company.jobIntention')}}</p>
        <!--<van-row class="p-line">-->
          <!--<van-col span="8"><p>期望工作地：</p></van-col>-->
          <!--<van-col span="8" offset="8"><p class="right-van">{{resume.domicile}}</p></van-col>-->
        <!--</van-row>-->
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('company.expectIndustry')}}：</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">{{ind.c_name}}</p></van-col>
        </van-row>
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('company.ExpectWork')}}：</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">{{pos.categoryname}}</p></van-col>
        </van-row>
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('company.expectSalary')}}：</p></van-col>
          <van-col span="14" offset="2" ><p class="right-van">{{sal.c_name}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box" v-show="this.work.length !== 0">
        <p class="title">{{$t('common.workExperience')}}</p>
        <van-row class="p-line" v-for="item in work">
          <van-col span="18"><p>{{item.companyname}}</p></van-col>
          <van-col span="6"><p class="right-van">{{item.jobs}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box" v-show="this.edu.length !== 0">
        <p class="title">{{$t('common.eduExperience')}}</p>
        <van-row class="p-line" v-for="items in edu">
          <van-col span="18"><p>{{items.school}}</p></van-col>
          <van-col span="6"><p class="right-van">{{items.speciality}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box" v-show="this.train.length !== 0">
        <p class="title">{{$t('common.trainExperience')}}</p>
        <van-row class="p-line" v-for="itemss of train">
          <van-col span="18"><p>{{itemss.agency}}</p></van-col>
          <van-col span="6" ><p class="right-van">{{itemss.description}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box" v-show="this.edu.length !== 0">
        <p class="title">{{$t('common.academicCertificate')}}</p>
        <van-row class="p-line" v-for="itemss of credent">
          <van-col span="18"><p>{{itemss.name}}</p></van-col>
          <van-col span="6"><p class="right-van">{{itemss.year}}年</p></van-col>
        </van-row>
      </div>

      <div class="footer-bar" v-if="this.$route.query.is">
        <van-row>
          <van-col span="8"  class="right blue">
            <p>
              <select id="flag" v-model="categoryName" @change="getCategotyId">
                <option v-for="(item,index) in categoryList" :value="item.category_name">{{item.category_name}}</option>
              </select>
            </p></van-col>
          <van-col span="16" class="right"><p @click="invite(resume.id)" v-show="resume.state == 0">{{$t('company.invitationInterview')}}</p></van-col>
          <van-col span="16" class="right posted" v-show="resume.state == 1"><p>{{$t('company.invited')}}</p></van-col>
        </van-row>
      </div>

      <div class="footer-bar" v-else>
        <van-row>
          <van-col span="24" class="right"><p @click="invite(resume.id)" v-show="resume.state == 0">{{$t('company.invitationInterview')}}</p></van-col>
          <van-col span="24" class="right"><p v-show="resume.state == 1">{{$t('company.invited')}}</p></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant'
  import {resumeShow,collectResume,interviewGet,reply} from '@/server/getData';
  export default {
    name: "detail",
    data() {
      return {
        title: this.$t('common.resDetail'),
        left: this.$t('common.back'),
        fix: true,
        resume:[],
        experience:[],
        education:[],
        c_name:'',
        tags:[],
        edu:[],
        work:[],
        train:[],
        phone:'',
        ind:[],
        pos:[],
        sal:[],
        credent:[],
        nat:[],
        data:{
          type:'',
          id:'',
          state:0,
        },
        posted:false,
        categoryName:'',
        categoryList:[
          {
            category_name:'未标记',
            category_id:'0'
          },
          {
            category_name:'合适',
            category_id:'1'
          },
          {
            category_name:'不合适',
            category_id:'2'
          },
          {
            category_name:'待定',
            category_id:'3'
          }
        ],
      }
    },
    mounted() {
      let resume_id = this.$route.query.id;
      let iss=this.$route.query.is;
      //console.log(this.$route);
      this.toDetail(resume_id,iss);
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
      //收藏简历
      onClickRight(e){
        collectResume({resume_id:e}).then(res=>{
          //console.log(res);
          Toast(this.$t(`message.` + res.message));
          //为了刷新图标
          this.toDetail(this.$route.query.id);
        });

      },
      //获取简历详情
      toDetail(resume_id) {
        resumeShow({id: resume_id}).then(res => {
          console.log(res);
          this.resume=res.data;
          //console.log(this.resume.describe)
          this.experience=res.data.resume_experience;
          this.education=res.data.resume_education;
          this.tags=res.data.tag_name;
          this.edu=res.data.education;
          this.work=res.data.work;
          this.train=res.data.train;
          this.credent=res.data.credent;
          this.phone=res.data.phone;
          this.ind=res.data.resume_industry;
          this.pos=res.data.resume_position;
          this.sal=res.data.resume_salary;
          this.tags=res.data.tag_name;
          this.nat=res.data.resume_job_nature;
        }).catch(error => {
          //console.log(error);
        });

          let stateCode=this.$route.query.st;
          //console.log(stateCode);
        // if(this.$route.query.st){
        //   let options = document.getElementById('flag').children;
          for(var i=0;i<this.categoryList.length;i++){
            if(this.categoryList[i].category_id==stateCode){
              this.categoryName=this.categoryList[i].category_name;
            }
          }
          // if(stateCode == 0){
          //   options[0].selected=true;
          // }else if(stateCode == 1){
          //   options[1].selected=true;
          // }else if(stateCode == 2){
          //   options[2].selected=true;
          // }
        // }
      },
      //跳转至发送面试邀请页
      invite(e){
        //查看是否已通过企业基本信息审核
        interviewGet({id:e}).then(res => {
          if(res.message == 'lang139'){
            Toast(this.$t(`message.` + res.message));
          }else if(res.message == 'lang137'){
            Toast(this.$t(`message.` + res.message));
            this.$router.push({path: '/coInfo',query: {id: e}});
          }else if(res.message == 'lang140'){
            Toast(this.$t(`message.` + res.message));
            this.$router.push({path: '/coPost',query: {id: e}});
          }else{
            this.$router.push({path: '/invite',query: {id: e}});
          }
        })
      },
      //选择状态
      getCategotyId(ele){
        this.data.type=2;
        this.data.id=this.$route.query.is;
        for(let i=0;i<this.categoryList.length;i++){
          if(this.categoryList[i].category_name==ele.target.value){
            this.categoryName=this.categoryList[i].category_name;
            //console.log(this.categoryName)
            this.data.state=this.categoryList[i].category_id;
            //console.log(this.data);
            reply(this.data).then(res=>{
              //console.log(res);
              if(res.data == ''){
                Toast(this.$t(`message.` + res.message));
              }
            });
          }
        }
      }

    },

  }
</script>

<style scoped>
  .company-content{width:97%;margin-left:1.5%;border-radius: .08rem;}
  .inner-box {padding: .1rem .2rem;background-color:#fff;margin-bottom:.065rem;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .p-name{font-size: .16rem;font-weight: bold;}
  .resume-header img{height:.4rem;width:.4rem;margin-top:.03rem;}
  .inner-box .title{font-weight:bold;}
  .inner-box .p-line{border-top:1px solid #f2f2f2;vertical-align:middle;height: auto;line-height: .4rem;padding-top:.1rem;}
  .inner-box .p-lines{border-top:1px solid #f2f2f2;padding-top:.1rem;}
  .inner-box .right-van{text-align: right;color:#666;}
  .footer-bar{height:.5rem;width:100%;font-size: 14px;margin-top:.5rem;position: fixed;bottom:0;}
  .footer-bar p{height:.5rem;line-height: .5rem;}
  .footer-bar .right{background-color:#0180CF;color:#fff;}
  .p-tags{height:auto;padding-left:0;}
  .p-tags span{display:inline-block;margin-bottom:.1rem;}
  .footer-bar .blue{background-color: lightskyblue;}
  .footer-bar .red{background-color: lightcoral;}
  .footer-bar .green{background-color: lightgreen;}
  #flag{width:100%;height:100%;appearance:none;text-align: center;border:none;outline: none;padding-left:37%;color:#fff;background-color: lightcoral;}
  #flag option{background-color: #fff;color:#666;}
  .posted{background-color: #979797;}
  .van-nav-bar .van-icon-like{color:lightcoral;}
  .van-nav-bar .van-icon-like-o::before{color:#fff;}
</style>
