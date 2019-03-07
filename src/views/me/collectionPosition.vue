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

      <div class="list" v-for="item in collection" @click="toDetail(item.id)" v-else>
          <van-row  class="list-box" >
            <van-col span="3" class="logo-col">
              <img :src="item.url+item.position_company.logo" alt="" >
            </van-col>
            <van-col span="14" offset="1" class="des-col">
              <van-row>
                <van-col span="24"><p class="p-name">{{item.name}}</p></van-col>
                <van-col><p class="p-experience">{{item.position_company.name}}</p></van-col>
                <van-col span="24"><p class="p-location">{{item.address}}&nbsp;|&nbsp;{{item.position_year.c_name}}&nbsp;|&nbsp;{{item.position_education.c_name}}</p></van-col>
              </van-row>
            </van-col>
            <van-col span="6" class="more-col">
              <van-row>
                <van-col ><p>{{item.position_salary.c_name}}</p></van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      <div class="page" v-show="this.noData == false">
        <van-row>
          <van-col span="24" v-if="this.next !== null"><p @click="getNext" class="next">加载更多</p></van-col>
          <van-col span="24" v-else><p class="unuse">没有更多了</p></van-col>
        </van-row>
      </div>

    </div>
  </div>
</template>

<script>
  import {getCollect,nextList,prevList} from '@/server/getData'
  import {Toast} from 'vant'
  export default {
    name: "collectionPosition",
    data() {
      return {
        title: this.$t('common.collectPo'),
        left: this.$t('common.back'),
        fix: true,
        collection:[],
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
     this.getCollection();
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
      //获取收藏的职位
      getCollection(){
        getCollect().then(res=>{
          //console.log(res);
          if(res.data == ''){
            this.noData=true;
            Toast(this.$t(`message.` + res.message));
          }else{
            this.noData=false;

            this.collection=res.data.data;
            this.current=res.data.current_page;
            this.total=res.data.last_page;
            this.next=res.data.next_page_url;
            if(this.next !== null){
              this.nextUrl=this.next.substr(24);
            }
            this.prev=res.data.prev_page_url;
            if(this.prev !== null){
              this.prevUrl=this.prev.substr(24);
            }
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
      //跳转至职位详情
      toDetail(e){
        let id = e;
        this.$router.push({path: 'detail',query: {id: e}})
      }
    }
  }
</script>

<style scoped>
  .list-box{margin-top:.05rem;height:auto;}
</style>
