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

      <div class="noData" v-if="this.noData == true">
        <img src="../../../static/images/nodata.png" alt="">
      </div>

      <div class="list" v-for="(item,index) in list" :key="index" @click="toDetail(item.resume.id)" v-else>
        <van-row  class="list-box" >
          <van-col span="3" class="logo-col">
            <img :src="item.resume.url+item.resume.log" alt="">
          </van-col>
          <van-col span="14" offset="1" class="des-col">
            <van-row>
              <van-col span="24"><p class="p-name">{{item.resume.name}}</p></van-col>
              <van-col span="24"><p class="p-location"><span v-if="item.resume.sex == 1">男</span><span v-else>女</span>&nbsp;|&nbsp;{{item.resume.resume_education.c_name}}&nbsp;|&nbsp;{{item.resume.resume_experience.c_name}}&nbsp;&nbsp;</p></van-col>
              <!--<van-col span="24"><p class="p-salary">期望薪资：<span>{{item.resume_salary.c_name}}</span></p></van-col>-->
            </van-row>
          </van-col>
          <van-col span="6" class="more-col">
            <van-row>
              <van-col ><p>{{item.resume.resume_position.categoryname}}</p></van-col>
            </van-row>
          </van-col>
          <!--<van-col span="24" v-show="item.tag !== null"><p class="p-tags" ><span v-for="items in item.tag_name" >{{items}}</span></p></van-col>-->
        </van-row>

      </div>
      <div class="page" v-if="this.noData == false">
        <van-row>
          <van-col span="24" v-if="this.next !== null"><p @click="getNext" class="next">加载更多</p></van-col>
          <van-col span="24" v-else><p class="unuse">没有更多了</p></van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {getResumeFavorites,nextList,prevList} from '@/server/getData';
  import { Toast } from 'vant';

  export default {
    name: "coCollect",
    data() {
      return {
        title: this.$t('common.collectionResume'),
        left: this.$t('common.back'),
        fix: true,
        list:[],
        other:[],
        name:'',
        noData:false,
        current:'',
        total:'',
        next:'',
        nextUrl:'',
        prev:'',
        prevUrl:'',
      }
    },
    mounted(){
      this.getCollect()
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      getCollect(){
        getResumeFavorites().then(res=>{
          console.log(res);

          if(res.data.length == 0){
            this.noData=true;
            Toast(this.$t(`message.` + res.message));
          }else{
            this.noData=false;

            this.list=res.data.data;
            this.other=res.data;

            // this.current=res.data.current_page;
            // this.total=res.data.last_page;
            this.next=res.data.next_page_url;
            if(this.next !== null){
              this.nextUrl=this.next.substr(24);
            }
            // this.prev=res.data.prev_page_url;
            // if(this.prev !== null){
            //   this.prevUrl=this.prev.substr(24);
            // }
          }
        })
      },
      //加载更多
      getNext(){
        if(this.next !== null){
          nextList(this.nextUrl).then(res=>{
            console.log(res.data.data);
            console.log(this.indexList);
            this.indexList =this.indexList.concat(res.data.data);
            this.tags=res.data.data.tag_name;

            this.current=res.data.current_page;
            this.next=res.data.next_page_url;
            if(this.next !== null){
              this.nextUrl=this.next.substr(24);
            }
            this.prev=res.data.prev_page_url;
            if(this.prev !== null){
              this.prevUrl=this.prev.substr(24);
            }
            //console.log('prev__'+this.prevUrl);
            //console.log('next__'+this.nextUrl);
          }).catch(error=>{
            //console.log(error);
          });
        }else{
          Toast('已经是最后一页了');
        }
      },
      toDetail(e){
        this.$router.push({path: 'resumeDetail',query: {id: e}})
      }
    }
  }
</script>

<style scoped>
  .list{padding-top:.05rem;}
  .list-box{height:auto;}
  .center-title{font-size: .14rem;text-align: center;padding:.05rem .2rem;color:#888;}
</style>
