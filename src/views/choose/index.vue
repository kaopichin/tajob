<template>
  <div id="app">
    <van-nav-bar
      :title=title
      :left-text=left
      left-arrow
      @click-left="onClickLeft"
      :fixed=fix
    />
    <div class="chooseBox">
      <div class="person innerBox" @click="choose(1)">
        <img src="../../../static/images/personal.png" alt="">
        <p>普通用户</p>
      </div>
      <div class="company innerBox" @click="choose(2)">
        <img src="../../../static/images/company.png" alt="">
        <p>企业用户</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {addUser} from '@/server/getData';
  import {Toast} from 'vant'
  export default {
    name: "index",
    data() {
      return {
        title: this.$t('common.selectIdentity'),
        left: this.$t('common.back'),
        fix: true,
      }
    },
    methods:{
      //返回backPage
      onClickLeft() {
        this.$router.push({path: '/backPage'})
      },
      choose(e){
        var data={
          type:e
        }
        addUser(data).then(res=>{
          // //console.log(data);
          // //console.log(res);
          Toast(this.$t(`message.`+res.message))
          if(res.data.type == '1'){
            this.$router.push({path: '/user'})
          }else{
            this.$router.push({path: '/company'})
          }
        }).catch(error=>{
          //console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .chooseBox{height:100%;padding:9% 25%;}
  .innerBox{height:2rem;width:2rem;border-radius: 50%;padding:.25rem 0;}
  .innerBox p{font-size: 16px; color:#fff;margin-top:.1rem;}
  .innerBox img{width:1rem;height:1rem;}
  .person{background-color: #f06c6f;margin-bottom:1rem;}
  .company{background-color: #6ac1ff;}
</style>
