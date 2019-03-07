<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :fixed=fix
      />
      <div class="me-header" @click="toMyResume">
        <van-row>
          <van-col span="5">
            <img :src="person.avatar" alt="" class="me-logo">
          </van-col>
          <van-col span="15">
            <p class="me-name">{{person.username}}</p>
            <p class="me-degree">{{$t('me.resumeIntegrity')}}：{{person.degree}}%</p>
          </van-col>
        </van-row>
      </div>
      <div class="me-content">
        <van-row >
          <div @click="toMyResume">
            <van-col span="12" class="inner-case left" >
              <van-icon name="records"/>
              <p>{{$t('common.myResume')}}</p>
            </van-col>
          </div>
          <div @click="toProgress">
            <van-col span="12" class="inner-case right">
              <van-icon name="sign" />
              <p>{{$t('common.jobProgress')}}</p>
            </van-col>
          </div>
        </van-row>
        <van-row>
          <div @click="tofollowed">
            <van-col span="12" class="inner-case left">
              <van-icon name="shop-collect" />
              <p>{{$t('common.followedCo')}}</p>
            </van-col>
          </div>
          <div @click="toCollect">
            <van-col span="12" class="inner-case right">
              <van-icon name="like-o" />
              <p>{{$t('common.collectPo')}}</p>
            </van-col>
          </div>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {personal} from '@/server/getData';
  import { Toast } from 'vant';
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
      this.getPerson();
    },
    methods: {
      toMyResume(){
        this.$router.push({path:'/myResume'});
      },
      toProgress(){
        this.$router.push({path:'/jobProgress'});
      },
      tofollowed(){
        this.$router.push({path:'/followedCo'});
      },
      toCollect(){
        this.$router.push({path:'/collectionPosition'});
      },
      //获取个人基本信息
      getPerson(){
        personal({type:1}).then(res=>{
          //console.log(res);
          if(res.data !== ''){
            this.person=res.data;
          }
          if(res.message == 'lang019') {
            Toast(this.$t(`message.` + res.message));
            this.$router.push({path: '/coMe'});
          }else if(res.message == 'lang020'){
            Toast(this.$t(`message.` + res.message));
            this.$router.push({path: '/myResume'});
          }
        })
      },
    }
  }
</script>

<style scoped>
  .me-header{width:100%;height:1rem;background-color: #0180CF;padding:.15rem .2rem;}
  .me-header .me-logo{height:.5rem; width:.5rem;border-radius: 50%;}
  .me-name{font-size: .16rem;font-weight: bold;color:#fff;text-align:left;vertical-align: bottom;margin-top:.05rem;}
  .me-degree{font-size: .14rem;color:#fff;text-align:left;vertical-align: bottom;margin-top:.05rem;}
  .me-content{padding:2%;color:#0180CF;}
  .inner-case{height:1.76rem;width:49%;padding: .55rem 0;z-index: 99;background-color: #fff;border-radius: .08rem;}
  .me-content .left{margin-right: 1%;margin-bottom: 2%;}
  .me-content .right{margin-left: 1%;margin-bottom: 2%;}
  .inner-case p{font-size: .16rem;text-align: center;margin-top:.08rem;}
</style>
