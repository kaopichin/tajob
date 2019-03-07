<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :left-text=left
        left-arrow
        @click-left="onClickLeft"
        :fixed=fix
      />

      <van-popup v-model="show">
        <van-loading  color="white" v-model="show"/>
      </van-popup>


      <div @click="toResumeHeader">
        <van-row class="resume-header resume-content" >
          <van-col span="4" class="resume-logo" >
            <img :src="person.avatar" alt="">
          </van-col>
          <van-col span="17" offset="1" class="header-content">
            <p class="name-p">{{person.username}}</p>
            <p>
              <span>{{$t('me.resumeIntegrity')}}：{{person.degree}}%</span>
            </p>
          </van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>
      </div>

      <div v-show="workLi !== ''" class="liBox">
        <div v-for="item in workLi" @click="toEditWork(item.id)">
          <van-row class="liList">
            <van-col span="12">{{item.companyname}}</van-col>
            <van-col span="6" offset="4" class="text-right">{{item.jobs}}</van-col>
            <van-col span="1" offset="1" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>

      </div>
      <div  @click="toWorkExp">
        <van-row class="resume-to resume-content">
          <van-col span="24"><p class="add"> + {{$t('common.workExperience')}}</p></van-col>
        </van-row>
      </div>

      <div v-show="eduLi !== ''" class="liBox">
        <div v-for="item in eduLi" @click="toEditEdu(item.id)">
          <van-row  class="liList">
            <van-col span="12">{{item.school}}</van-col>
            <van-col span="6" offset="4" class="text-right">{{item.speciality}}</van-col>
            <van-col span="1" offset="1" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>
      </div>
      <div @click="toEduExp">
        <van-row class="resume-to resume-content">
          <van-col span="24"><p class="add"> + {{$t('common.eduExperience')}}</p></van-col>
        </van-row>
      </div>

      <div v-show="traLi !== ''" class="liBox">
        <div v-for="item in traLi" @click="toEditTra(item.id)">
          <van-row class="liList">
            <van-col span="12">{{item.agency}}</van-col>
            <van-col span="6" offset="4" class="text-right">{{item.description}}</van-col>
            <van-col span="1" offset="1" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>

      </div>
      <div @click="toTraExp">
        <van-row class="resume-to resume-content">
          <van-col span="24"><p class="add"> + {{$t('common.trainExperience')}}</p></van-col>
        </van-row>
      </div>

      <div v-show="creLi !== ''" class="liBox">
        <div v-for="item in creLi" @click="toEditCer(item.id)">
          <van-row class="liList">
            <van-col span="12">{{item.name}}</van-col>
            <van-col span="6" offset="4" class="text-right">{{item.year}}年{{item.month}}月</van-col>
            <van-col span="1" offset="1" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>
      </div>
      <div @click="toCertificate">
        <van-row class="resume-to resume-content">
          <van-col span="24"><p class="add"> + {{$t('common.academicCertificate')}}</p></van-col>
        </van-row>
      </div>

      <div @click="toTags">
        <van-row class="resume-to resume-content">
          <van-col span="4"><p>{{$t('common.tags')}}</p></van-col>
          <van-col span="18" ><p class="content-right">
            <input type="text" v-model="advantage" placeholder="请选择" readonly>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>
      </div>
      <div @click="toSelf">
        <van-row class="resume-to resume-content">
          <van-col span="8"><p>{{$t('common.selfEvaluation')}}</p></van-col>
          <van-col span="8" offset="6"><p class="content-right">请填写</p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="" @click="showAr">
          </van-col>
        </van-row>
      </div>

    </div>
  </div>
</template>

<script>
  import {personal,educationList,workList,credentList,trainList} from '@/server/getData';
  export default {
    name: "myResume",
    data() {
      return {
        title: this.$t('common.myResume'),
        left: this.$t('common.back'),
        fix: true,
        showArea: false,
        advantage:'',
        person:[],
        workLi:[],
        eduLi:[],
        traLi:[],
        creLi:[],
        show: true,
      }
    },
    mounted(){
      this.show=true;
      this.getPerson();
      this.list();

      setTimeout(()=>{
        this.show=false;
      },1250);
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
      toResumeHeader(){
        this.$router.push({path: '/resumeHeader'});
      },
      //获取个人基本信息
      getPerson(){
        personal({type:1}).then(res=>{
          //console.log(res);
          this.person=res.data;
        })
      },
      //加载已新增的四种经历
      list(){
        workList().then(res=>{
          //console.log(res);
          this.workLi=res.data;
        });
        educationList().then(res=>{
          //console.log(res);
          this.eduLi=res.data;
        });
        credentList().then(res=>{
          //console.log(res);
          this.creLi=res.data;
        });
        trainList().then(res=>{
          //console.log(res);
          this.traLi=res.data;
        });
      },
      //显示地区框
      showAr(){
        this.showArea=true;
      },
      //跳转至特长标签页
      toTags(){
        // let e = this.person.memberId;,query:{id:e}
        this.$router.push({path: '/tags'});
      },
      //跳转至工作经历页
      toWorkExp(){
        this.$router.push({path:'/workExperience'});
      },
      //跳转至培训经历
      toTraExp(){
        this.$router.push({path:'/trainExperience'});
      },
      //跳转至教育经历页
      toEduExp(){
        this.$router.push({path:'/eduExperience'});
      },
      //跳转至新增证书
      toCertificate(){
        this.$router.push({path:'/academicCertificate'});
      },
      //跳转至自我你评价
      toSelf(){
        this.$router.push({path:'/selfEvaluation'});
      },
      //跳转至修改工作经历
      toEditWork(e){
        this.$router.push({path:'/workExperience',query:{id:e}});
      },
      //跳转至修改教育工作经历
      toEditEdu(e){
        this.$router.push({path:'/eduExperience',query:{id:e}});
      },
      //跳转至修改培训经历
      toEditTra(e){
        this.$router.push({path:'/trainExperience',query:{id:e}});
      },
      //跳转至修改证书
      toEditCer(e){
        this.$router.push({path:'/academicCertificate',query:{id:e}});
      },

    }
  }
</script>

<style scoped>
  #app{background-color: #f2f2f2;}
  .content{}
  .resume-content{width: 100%;height:.5rem;display: block;background-color: #fff;margin-bottom: .065rem;}
  .resume-content p{font-size: .14rem;line-height:.21rem;text-align: left;}

  .resume-header{height:1rem;margin-bottom: .065rem;padding:.25rem .05rem;}
  .resume-logo img{height:.5rem;width:.5rem;border-radius: 50%;}
  .header-content .name-p{font-size: .16rem;line-height:.25rem;font-weight: bold;}
  .resume-more img{height:.15rem;width:.15rem;}
  .resume-to{height: .4rem;padding: .1rem .05rem .1rem .15rem;}
  .resume-to .resume-more img{height:.15rem;width:.15rem;margin-bottom:.09rem;}
  .resume-to input{border:none;text-align: right;width:100%;}
  .resume-content .content-right{text-align: right;color: #888;}
  .resume-to .add{text-align: center;color: #ff4c4d;}
  .liBox{width:100%;height:auto;font-size: .14rem;background-color: #fff;text-align: left;padding:0 .2rem;}
  .liList{width:100%;border-bottom: 1px solid #ededed;padding:.1rem 0;}
  .liList .van-col{line-height:.19rem;height:.19rem;overflow: hidden;}
  .liList .van-col.text-right{text-align: right;color: #888;}

  .van-popup{background-color: unset;}
  .van-loading{height:60px;width:60px;overflow: hidden;}
  .van-modal{background-color: rgba(0,0,0,.3);}
</style>
