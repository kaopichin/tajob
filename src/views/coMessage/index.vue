<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :fixed=fix
      />

      <div class="noData" v-if="this.noData == true">
        <img src="../../../static/images/nodata.png" alt="">
      </div>

      <div v-for="item in interview" class="out-box" v-else>
        <div @click="toDetail(item.resume_id,item.id,item.state)">
          <van-row>
            <van-col span="2" offset="1">
              <div class="logo-box">
                <img :src="item.user.avatar" alt="">
              </div>
            </van-col>
            <van-col span="18" offset="1">
              <div class="message-box">
                <van-row>
                  <van-col span="24">用户：<span>{{item.user.username}}</span>&nbsp;&nbsp;&nbsp;&nbsp;</van-col>
                  <van-col span="24">于&nbsp;&nbsp;<span>{{item.created_at}}</span>&nbsp;&nbsp;发来简历，</van-col>
                  <van-col span="24">应聘&nbsp;&nbsp;<span>{{item.app_position.name}}</span>&nbsp;&nbsp;岗位。</van-col>
                  <van-col span="24">联系电话：<span>{{item.user.mobilePhone}}</span></van-col>
                  <van-col span="24" v-if="item.state == 0"><span class="blue-span">{{$t('coMsg.resumeStatus')}}：{{$t('coMsg.unmarked')}}</span></van-col>
                  <van-col span="24" v-else-if="item.state == 1"><span class="blue-span">{{$t('coMsg.resumeStatus')}}：{{$t('coMsg.suitable')}}</span></van-col>
                  <van-col span="24" v-else-if="item.state == 2"><span class="blue-span">{{$t('coMsg.resumeStatus')}}：{{$t('coMsg.notSuitable')}}</span></van-col>
                  <van-col span="24" v-else-if="item.state == 3"><span class="blue-span">{{$t('coMsg.resumeStatus')}}：{{$t('coMsg.pending')}}</span></van-col>
                </van-row>
              </div>
            </van-col>

          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {newNotice} from '@/server/getData';
  import {Toast} from 'vant';
  export default {
    name: "index",
    data() {
      return {
        title: this.$t('common.message'),
        fix:true,
        interview:[],
        noData:false,
      }
    },
    mounted(){
      newNotice({id:2}).then(res=>{
        //console.log(res);
        this.interview=res.data.data;
        if(res.data == ''){
          this.noData=true;
          Toast(this.$t(`message.` + res.message));
        }else{
          this.noData=false;
        }
      }).catch(res=>{

      });
    },
    methods: {
      toDetail(e,f,g){
        this.$router.push({path: 'resumeDetail',query: {id: e,is:f,st:g}})
      }
    }
  }
</script>

<style scoped>
  .out-box{width:100%;height:auto;text-align: left;color:#555;margin-top:.5rem;}
  .logo-box{}
  .logo-box img{height:.4rem;width:.4rem;border-radius: 50%;}
  .message-box{height:auto;padding:.1rem .2rem;background-color: #fff;font-size: .14rem;border-radius:.2rem;}
  .blue-span{color: #0180CF;font-weight: bold;}
</style>
