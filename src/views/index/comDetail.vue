<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :left-text=left
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight(company.id)"
        :fixed=fix
      >
      <van-icon name="like-o" slot="right" v-show="company.state == 0"/>
      <van-icon name="like" slot="right" v-show="company.state == 1"/>
      </van-nav-bar>
      <div class="company-header inner-box">
        <van-row>
          <van-col span="4" >
            <img class="company-logo" :src="company.url+company.logo" alt="">
          </van-col>
          <van-col span="19" offset="1">
            <van-row>
              <van-col span="24"><p class="p-name">{{company.name}}</p></van-col>
            </van-row>
            <van-row>
              <van-col span="24"><p>{{nature.c_name}} • {{scale.c_name}} • {{trade.c_name}}</p></van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>
      <div class="company-content inner-box">
        <p class="title">{{$t('coMe.companyProfile')}}：</p>
        <van-row>
          <van-col span="24"><p class="p-exp">{{company.introduce}}</p></van-col>
        </van-row>
      </div>

      <div class="company-content inner-box">
        <p class="title">{{$t('user.companyWelfare')}}：</p>
        <van-row class="p-lines" v-show="tags !== ''">
          <p class="p-tags" ><span v-for="item in tags" >{{item}}</span></p>
        </van-row>
      </div>

      <div class="company-more inner-box">
        <van-row>
          <van-col span="10"><p>{{$t('user.companyNickname')}}：</p></van-col>
          <van-col span="13" offset="1"><p>{{company.nickname}}</p></van-col>
        </van-row>
        <van-row>
          <van-col span="10"><p>{{$t('coMe.companyAddress')}}：</p></van-col>
          <van-col span="13" offset="1"><p>{{company.address}}</p></van-col>
        </van-row>
        <van-row>
          <van-col span="6"><p>{{$t('coMe.phone')}}：</p></van-col>
          <van-col span="17"><p>{{company.phone}}</p></van-col>
        </van-row>
        <van-row>
          <van-col span="6"><p>{{$t('coMe.email')}}：</p></van-col>
          <van-col span="17"><p>{{company.email}}</p></van-col>
        </van-row>
      </div>

    </div>
  </div>
</template>

<script>
  import {showCom,comFollow} from '@/server/getData';
  import {Toast} from 'vant';
  export default {
    name: "index",
    data() {
      return {
        title: this.$t('common.comDetail'),
        left: this.$t('common.back'),
        fix: true,
        company:[],
        nature:[],
        scale:[],
        trade:[],
        tags:[],
        }
    },
    mounted() {
      let com_id = this.$route.query.id;
      this.comDetail(com_id);
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      // 关注/取消关注公司
      onClickRight(e){
        comFollow({id:e}).then(res=>{
          //console.log(res);
          Toast(this.$t(`message.` + res.message));
          //为了刷新图标
          this.comDetail(this.$route.query.id);
        })
      },
      //获取公司详情
      comDetail(com_id) {
        showCom({id: com_id}).then(res => {
          //console.log(res);
          this.company=res.data;
          this.nature=res.data.com_nature;
          this.scale=res.data.com_scale;
          this.trade=res.data.com_trade;
          this.tags=res.data.tag;
        }).catch(error => {
          //console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .inner-box {padding: .1rem .2rem;background-color:#fff;margin-bottom:.065rem;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .inner-box .p-name{font-size: .14rem;font-weight: bold;}
  .company-header img{height:.4rem;width:.4rem;margin-top:.1rem;}
  .company-content{width:97%;margin-left:1.5%;border-radius: .08rem;}
  .company-more{width:97%;margin-left:1.5%;border-radius: .08rem;}
  .company-content .title{font-weight:bold;}
  .van-nav-bar .van-icon-like{color:lightcoral;}
  .van-nav-bar .van-icon-like-o::before{color:#fff;}
</style>
