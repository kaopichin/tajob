<template>
  <div class="content">
    <van-nav-bar
      :title=title
      :left-text=left
      left-arrow
      @click-left="onClickLeft"
      :fixed=fix
    />
    <van-search
      v-model="value"
      placeholder="请输入职位关键词"
      show-action
      @search="onSearch"
    >
      <div slot="action" @click="onSearch(value)">搜索</div>
    </van-search>
    <div class="search">
      <p class="cardTitle">热门搜索</p>
      <div class="hotCard">
        <span @click="toWords">销售</span>
        <span @click="toWords">运营</span>
        <span @click="toWords">产品</span>
        <span @click="toWords">产品经理</span>
        <span @click="toWords">金融</span>
        <span @click="toWords">前台</span>
        <span @click="toWords">管家</span>
        <!--<span @click="toWords">EOS</span>-->
      </div>
    </div>

    <div class="noData" v-if="this.noData == true">
      <img src="../../../static/images/nodata.png" alt="">
    </div>

    <div class="list" v-for="item in searchInfo" @click="toDetail(item.id)" v-else>
      <van-row  class="list-box" >
        <van-col span="3" class="logo-col">
          <img :src="item.url+item.position_company.logo" alt="">
        </van-col>
        <van-col span="14" offset="1" class="des-col">
          <van-row>
            <van-col span="24"><p class="p-name">{{item.name}}</p></van-col>
            <van-col><p class="p-experience">{{item.position_company.nickname}}</p></van-col>
            <van-col span="24"><p class="p-location">{{item.position_company.address}}&nbsp;|&nbsp;{{item.position_year.c_name}}&nbsp;|&nbsp;{{item.position_education.c_name}}</p></van-col>
          </van-row>
        </van-col>
        <van-col span="6" class="more-col">
          <van-row>
            <van-col ><p>{{item.position_salary.c_name}}</p></van-col>
          </van-row>
        </van-col>
        <van-col span="24" v-show="item.tag !== null"><p class="p-tags" ><span v-for="items in item.tag_name" >{{items}}</span></p></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import {searchPosition} from '@/server/getData';
  import {Toast} from 'vant'
  export default {
    name: "search",
    data() {
      return {
        title: this.$t('common.search'),
        left: this.$t('common.back'),
        fix: true,
        value:'',
        data:{
          val:'',
        },
        searchInfo:[],
        noData:false,
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      //搜索
      onSearch(e){
        searchPosition({val:e}).then(res=>{
          //console.log(res);
          this.searchInfo=res.data.data;
          if(res.data == ''){
            this.noData=true;
            Toast(this.$t(`message.` + res.message));
          }else{
            this.noData=false;
          }
        })
      },
      //点击关键字
      toWords(e){
        var hotWords = e.target.innerText;
        this.value=hotWords;
      },
      //跳转至详情页
      toDetail(e){
        this.$router.push({path: 'detail',query: {id: e}})
      }
    }
  }
</script>

<style scoped>
  .search{width:100%;height:100%;font-size: .14rem;margin-bottom: .1rem;}
  .search .cardTitle {font-size: .14rem;text-align: left;text-indent: .15rem;line-height: .25rem;height:.25rem;}
  .hotCard{background-color: #fff;padding:.15rem .25rem;text-align: left;}
  .hotCard span{padding:.05rem .15rem;margin:.05rem;display: inline-block;text-align: left;border-radius: .05rem;color:#fff;}
  .hotCard span:nth-child(1),.hotCard span:nth-child(4),.hotCard span:nth-child(7){background-color: lightskyblue;}
  .hotCard span:nth-child(2),.hotCard span:nth-child(5){background-color: lightcoral;}
  .hotCard span:nth-child(3),.hotCard span:nth-child(6){background-color: lightgreen;}

</style>
