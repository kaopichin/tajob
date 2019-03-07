<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :left-text=left
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight(details.id)"
        :fixed=fix
      >
        <van-icon name="like-o" slot="right" v-show="details.flag == 0"/>
        <van-icon name="like" slot="right" v-show="details.flag == 1"/>
      </van-nav-bar>
      <div class="detail-header inner-box">
        <van-row>
          <van-col span="16"><p class="p-name">{{details.name}}</p></van-col>
        </van-row>
        <van-row>
          <van-col span="10"><p class="p-exp">{{details.address}}</p></van-col>
          <van-col span="3"><p class="p-exp">{{education.c_name}}</p></van-col>
          <van-col span="4"><p class="p-exp">{{years.c_name}}</p></van-col>
          <van-col span="7"><p class="p-salary">{{salary.c_name}}</p></van-col>
        </van-row>
      </div>
      <div class="company-box inner-box" @click="toCom(details.company_id)">
        <van-row>
          <van-col span="3" >
            <img class="company-logo" :src="details.url+position.logo" alt="">
          </van-col>
          <van-col span="19" offset="1">
            <van-row>
              <van-col span="10"><p>{{$t('coMe.companyName')}}：</p></van-col>
              <van-col span="10" offset="2"><p class="name-p">{{position.name}}</p></van-col>
            </van-row>
            <van-row>
              <van-col span="7"><p>{{$t('coMe.phone')}}：</p></van-col>
              <van-col span="17"><p>{{position.phone}}</p></van-col>
            </van-row>
          </van-col>
          <van-col span="1" >
            <img class="right" src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>
      </div>
      <div class="exp-box inner-box">
        <p class="title">{{$t('user.jobResponsibilities')}}：</p>
        <van-row>
          <van-col span="24"><p class="p-exp">{{details.duty}}</p></van-col>
        </van-row>
      </div>
      <div class="exp-box inner-box">
        <p class="title">{{$t('user.JobRequirements')}}：</p>
        <van-row>
          <van-col span="24"><p class="p-exp">{{position.introduce}}</p></van-col>
        </van-row>
      </div>

      <div class="postResume" v-if="this.$route.query.is">
        <van-row>
          <van-col span="8"  class="right red">
            <select id="flag" v-model="categoryName" @change="getCategotyId">
              <option v-for="(item,index) in categoryList" :value="item.category_name">{{item.category_name}}</option>
            </select>
          </van-col>
          <van-col span="16"><p @click="postResume" v-show="details.hair_state == 0">{{$t('user.submitResume')}}</p></van-col>
          <van-col span="16" class="posted" v-show="details.hair_state == 1"><p>{{$t('user.delivered')}}</p></van-col>
        </van-row>
      </div>
      <div class="postResume" v-else >
        <van-col span="24" v-show="details.hair_state == 0"><p @click="postResume">{{$t('user.submitResume')}}</p></van-col>
        <van-col span="24" class="posted" v-show="details.hair_state == 1"><p>{{$t('user.delivered')}}</p></van-col>
      </div>
    </div>
  </div>
</template>

<script>
  import {showDetail,favoritersJob,resumeApply,reply,newNotice} from '@/server/getData';
  import {Toast} from 'vant';
  export default {
    name: "detail",
    data() {
      return {
        title: this.$t('common.detail'),
        left: this.$t('common.back'),
        fix: true,
        id: '',
        details: [],
        position: [],
        education: [],
        years: [],
        salary: [],
        value:'',
        post:{
          position_id:'',
          company_id:'',
        },
        posted:false,
        data:{
          type:0,
          id:0,
          state:0,
        },
        categoryName:'',
        categoryList:[
          {
            category_name:'未标记',
            category_id:'0'
          },
          {
            category_name:'同意',
            category_id:'1'
          },
          {
            category_name:'不同意',
            category_id:'2'
          }
        ],
      }
    },
    mounted() {
      let detail_id = this.$route.query.id;
      let iss=this.$route.query.is;
      this.toDetail(detail_id);
      // 获取邀请状态
      if(iss){
        this.getState();
      }
      //获取职位亮点列表

    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      //收藏职位
      onClickRight(e){
        favoritersJob({id:e}).then(res=>{
          // //console.log(res);
          Toast(this.$t(`message.` + res.message));
          //为了刷新图标
          this.toDetail(this.$route.query.id);
        })
      },
      //获取邀请状态
      getState(){
        let stateCode=this.$route.query.st;
        //console.log(stateCode);
        let options = document.getElementById('flag').children;
        for(var i=0;i<this.categoryList.length;i++){
          if(this.categoryList[i].category_id==stateCode){
            this.categoryName=this.categoryList[i].category_name;
          }
        }
        if(stateCode == 0){
          options[0].selected=true;
        }else if(stateCode == 1){
          options[1].selected=true;
        }else if(stateCode == 2){
          options[2].selected=true;
        }
      },
      //获取职位详情
      toDetail(detail_id) {
        showDetail({id: detail_id}).then(res => {
          //console.log(res);
          this.details = res.data;
          this.position = res.data.position_company;
          this.education = res.data.position_education;
          this.years = res.data.position_year;
          this.salary = res.data.position_salary;
          // //console.log(this.details);
        }).catch(error => {
          // //console.log(error);
        });
      },
      //去公司页
      toCom(e){
        let id = e;
        this.$router.push({path: '/comDetail',query: {id: e}})
      },
      //投递简历
      postResume(){
        this.post.position_id=this.details.id;
        this.post.company_id=this.details.company_id;
        // //console.log(this.post);
        if(this.post.position_id && this.post.company_id){
          resumeApply(this.post).then(res=>{
            // //console.log(res);
            Toast(this.$t(`message.` + res.message));
            if(res.message == 'lang108'){
              this.posted=true;

              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
            //为了刷新图标
            // this.resumeApply(this.post);
          })
        }
      },
      //选择邀请状态
      getCategotyId(ele){
        this.data.type=1;
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
    }
  }
</script>

<style scoped>
  .inner-box {padding: .1rem .2rem;background-color:#fff;margin-bottom:.065rem;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .detail-header .p-name {margin-bottom: .1rem;font-size: .16rem;}
  .company-box{padding: .1rem .2rem .1rem .15rem;width:97%;margin-left:1.5%;border-radius: .08rem;}
  .company-box .right{height:.15rem;width:.15rem;margin-top:.16rem;}
  .company-box .company-logo{height:.3rem;width:.3rem;margin-top:.1rem;}
  .detail-header .p-salary {color: #0180CF;text-align: right;}
  .name-p{overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
  .exp-box{width:97%;margin-left:1.5%;border-radius: .08rem;}
  .exp-box .title{font-weight:bold;}
  .postResume{width: 100%;height: .5rem;line-height: .5rem;font-size: .16rem;color: #fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}
  .posted{background-color: #979797;}
  .red{background-color: lightcoral;}
  #flag{display:inline-block;width:100%;height:.5rem;appearance:none;text-align: center;border:none;outline: none;padding-left:37%;color:#fff;background-color: lightcoral;}
  #flag option{background-color: #fff;color:#666;}
  .van-nav-bar .van-icon-like{color:lightcoral;}
  .van-nav-bar .van-icon-like-o::before{color:#fff;}
</style>
