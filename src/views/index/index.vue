<template>
  <div id="app">
    <div class="content">
      <!--<van-nav-bar-->
        <!--:title=title-->
        <!--:fixed=fix-->
      <!--/>-->
      <!--<div class="search">-->
        <!--<van-search placeholder="请输入职位关键词" @click="toSearch" />-->
      <!--</div>-->
      <!--<van-swipe class="swipe" :autoplay="3000">-->
        <!--<van-swipe-item v-for="item in img">-->
          <!--<img class="s-img" :src="item.value" alt="" >-->
        <!--</van-swipe-item>-->
      <!--</van-swipe>-->

      <!--<div class="noData" v-if="this.noData == true">-->
        <!--<img src="../../../static/images/nodata.png" alt="">-->
      <!--</div>-->

      <!--<div class="list" v-for="item in indexList" @click="toDetail(item.id)" v-else>-->
        <!--<van-row  class="list-box" >-->
          <!--<van-col span="3" class="logo-col">-->
            <!--<img :src="item.url+item.position_company.logo" alt="">-->
          <!--</van-col>-->
          <!--<van-col span="14" offset="1" class="des-col">-->
            <!--<van-row>-->
              <!--<van-col span="24"><p class="p-name">{{item.name}}</p></van-col>-->
              <!--<van-col><p class="p-experience">{{item.position_company.nickname}}</p></van-col>-->
              <!--<van-col span="24"><p class="p-location">{{item.position_company.address}}&nbsp;|&nbsp;{{item.position_year.c_name}}&nbsp;|&nbsp;{{item.position_education.c_name}}</p></van-col>-->
            <!--</van-row>-->
          <!--</van-col>-->
          <!--<van-col span="6" class="more-col">-->
            <!--<van-row>-->
              <!--<van-col ><p>{{item.position_salary.c_name}}</p></van-col>-->
            <!--</van-row>-->
          <!--</van-col>-->
          <!--<van-col span="24" v-show="item.tag !== null"><p class="p-tags" ><span v-for="items in item.tag_name" >{{items}}</span></p></van-col>-->
        <!--</van-row>-->
      <!--</div>-->
    </div>
  </div>
</template>

<!--<script>-->
  <!--import {index,isPerfect,swiper} from '@/server/getData';-->
  <!--import {Toast} from 'vant';-->
  <!--export default {-->
    <!--name: "index",-->
    <!--data() {-->
      <!--return {-->
        <!--title: this.$t('common.index'),-->
        <!--fix:true,-->
        <!--indexList:[],-->
        <!--id:0,-->
        <!--img:[],-->
        <!--noData:false,-->
      <!--}-->
    <!--},-->
    <!--mounted(){-->
      <!--//判断用户信息是否完整-->
      <!--isPerfect().then(res=>{-->
        <!--//console.log(res);-->
        <!--if(res.message == 1.2){-->
          <!--//普通用户未完善-->
          <!--Toast('请先完善你的个人简历');-->
          <!--this.$router.push({path: 'resumeHeader'})-->
        <!--}-->
      <!--});-->
      <!--//加载首页职位列表-->
      <!--index().then(res=>{-->
        <!--this.indexList=res.data.data;-->
        <!--this.id=res.data.data.id;-->
        <!--//console.log(res);-->
        <!--if(res.data == ''){-->
          <!--this.noData=true;-->
          <!--Toast(this.$t(`message.` + res.message));-->
        <!--}else{-->
          <!--this.noData=false;-->
        <!--}-->
      <!--}).catch(error=>{-->
        <!--//console.log(error);-->
      <!--});-->
      <!--//加载轮播图-->
      <!--this.swiper();-->
    <!--},-->
    <!--methods: {-->
      <!--swiper(){-->
        <!--swiper().then(res=>{-->
          <!--//console.log(res);-->
          <!--this.img=res.data;-->
        <!--})-->
      <!--},-->
      <!--toDetail(e){-->
        <!--this.$router.push({path: 'detail',query: {id: e}})-->
      <!--},-->
      <!--toSearch(){-->
        <!--this.$router.push({path: 'search'})-->
      <!--}-->
    <!--}-->

  <!--}-->
<!--</script>-->

<!--<style scoped>-->

  <!--.swipe{height:2rem;width:100%;margin-bottom:.065rem;}-->
  <!--.swipe .s-img{width:100%;height:2rem;}-->
<!--</style>-->
