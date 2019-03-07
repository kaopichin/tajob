<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :fixed=fix
      />
      <div class="me-header" @click="tocoInfo">
        <van-row>
          <van-col span="6">
            <img :src="person.logo" alt="" class="me-logo">
          </van-col>
          <van-col span="18">
            <p class="me-name">{{person.name}}</p>
          </van-col>
        </van-row>
      </div>
      <div class="me-content">
        <van-row >
          <div @click="tocoInfo">
            <van-col span="12" class="inner-case left" >
              <van-icon name="records"/>
              <p>{{$t('common.companyInfo')}}</p>
            </van-col>
          </div>

          <div @click="tocoPost">
            <van-col span="12" class="inner-case" >
              <van-icon name="upgrade"/>
              <p>{{$t('common.postPosition')}}</p>
            </van-col>
          </div>

          <div @click="tocoManage">
            <van-col span="12" class="inner-case" >
              <van-icon name="edit"/>
              <p>{{$t('common.managePosition')}}</p>
            </van-col>
          </div>

        </van-row>
        <van-row>
          <div @click="toReceive">
            <van-col span="12" class="inner-case left">
              <van-icon name="tosend" />
              <p>{{$t('common.receivedResume')}}</p>
            </van-col>
          </div>
          <!--<div @click="toDownload">-->
            <!--<van-col span="12" class="inner-case">-->
              <!--<van-icon name="sign" />-->
              <!--<p>下载的简历</p>-->
            <!--</van-col>-->
          <!--</div>-->
          <div @click="toCollect">
            <van-col span="12" class="inner-case">
              <van-icon name="like-o" />
              <p>{{$t('common.collectionResume')}}</p>
            </van-col>
          </div>
          <div @click="toInterview">
            <van-col span="12" class="inner-case right">
              <van-icon name="passed" />
              <p>{{$t('common.interviewInvitation')}}</p>
            </van-col>
          </div>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {personal} from '@/server/getData';
  export default {
    name: "index",
    data() {
      return {
        title: '',
        fix:true,
        person:[]
      }
    },
    mounted(){
      //企业信息是否完善
      this.getPerson();
    },
    methods: {
      //跳转至企业信息
      tocoInfo(){
        this.$router.push({path:'/coInfo'});
      },
      //跳转至发布职位页
      tocoPost(){
        this.$router.push({path:'/coPost'});
      },
      //跳转至管理职位页
      tocoManage(){
        this.$router.push({path:'/coManage'});
      },
      //跳转至收到的简历页
      toReceive(){
        this.$router.push({path:'/coRecive'});
      },
      //跳转至下载的简历页
      toDownload(){
        this.$router.push({path:'/coDownload'});
      },
      //跳转至收藏的简历页
      toCollect(){
        this.$router.push({path:'/coCollect'});
      },
      //跳转至面试快邀请
      toInterview(){
        this.$router.push({path:'/coInterview'});
      },
      //获取个人基本信息
      getPerson(){
        personal({type:2}).then(res=>{
          //console.log(res);
          if(res.data !== ''){
            this.person=res.data;
          }
          if(res.message == 'lang115'){
            Toast(this.$t(`message.` + res.message));
            //先完善企业信息
            this.$router.push({path:'/coInfo'});
          }else if(res.message == 'lang018'){
            Toast(this.$t(`message.` + res.message));
            this.$router.push({path:'/me'});
          }else{

          }
        })
      },
    }
  }
</script>

<style scoped>
  .me-header{width:100%;height:1rem;background-color: #0180CF;padding:.15rem .2rem;}
  .me-header .me-logo{height:.5rem; width:.5rem;border-radius: 50%;}
  .me-name{font-size: .16rem;font-weight: bold;color:#fff;text-align:left;vertical-align: bottom;margin-top:.155rem;overflow: hidden;}
  .me-content{padding:2%;color:#0180CF;}
  .me-content .inner-case{height:1.15rem;width:32%;padding: .25rem 0;z-index: 99;background-color: #fff;border-radius: .08rem;margin-left:2%;margin-bottom:2%;}
  .me-content .left{margin-left: 0;}
  .inner-case p{font-size: .16rem;text-align: center;margin-top:.08rem;}
</style>
