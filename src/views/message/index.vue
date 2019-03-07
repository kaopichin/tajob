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
        <div @click="toDetail(item.position_id,item.id,item.state)">
        <van-row>
          <van-col span="2" offset="1">
            <div class="logo-box">
              <img :src="item.url+item.invita_company.logo" alt="">
            </div>
          </van-col>
          <van-col span="18" offset="1">
            <div class="message-box">
              <van-row>
                <van-col span="24"><span>{{item.invita_company.name}}</span>&nbsp;&nbsp;邀请您，&nbsp;&nbsp;</van-col>
                <van-col span="24">于&nbsp;&nbsp;<span>{{item.time}}时</span>&nbsp;&nbsp;参加，</van-col>
                <van-col span="24">位于&nbsp;&nbsp;<span >{{item.address}}</span>&nbsp;&nbsp;的</van-col>
                <van-col span="24"><span >{{item.invita_position.name}}</span>&nbsp;&nbsp;岗位面试。</van-col>
                <van-col span="24">联系电话：<span >{{item.phone}}</span></van-col>
                <van-col sspan="24" v-if="item.state == 0"><span class="blue-span">{{$t('msg.agreeNot')}}：{{$t('coMsg.unmarked')}}</span></van-col>
                <van-col sspan="24" v-else-if="item.state == 1"><span class="blue-span">{{$t('msg.agreeNot')}}：{{$t('msg.agree')}}</span></van-col>
                <van-col sspan="24" v-else-if="item.state == 2"><span class="blue-span">{{$t('msg.agreeNot')}}：{{$t('msg.notAgree')}}</span></van-col>
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
        times:'',
        time:'',
        noData:false,
      }
    },
    mounted(){
      newNotice({id:1}).then(res=>{
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
        this.$router.push({path: 'detail',query: {id: e,is:f,st:g}})
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
