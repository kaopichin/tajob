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


        <div class="list" v-for="item in progress" v-else>
          <van-row  class="list-box" >
            <van-col span="18" offset="1" class="des-col">
              <van-row>
                <van-col span="24"><p  class="p-name">职位：{{item.app_position.name}}</p></van-col>
                <van-col span="24"><p class="p-experience">公司：{{item.app_com.nickname}}</p></van-col>
                <van-col span="24"><p class="p-experience">投递时间：{{item.created_at}}</p></van-col>
              </van-row>
            </van-col>
            <van-col span="5" class="more-col">
              <van-row>
                <van-col >
                  <p v-if="item.state == 0">已投递</p>
                  <p v-else-if="item.state == 1">合适</p>
                  <p v-else-if="item.state == 2">不合适</p>
                  <p v-else-if="item.state == 3">待定</p>
                </van-col>
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
  import {getProcess,nextList,prevList} from '@/server/getData'
  import {Toast} from 'vant'
  export default {
    name: "jobProgress",
    data() {
      return {
        title: this.$t('common.jobProgress'),
        left: this.$t('common.back'),
        fix: true,
        progress: [],
        noData:false,
        current:'',
        total:'',
        next:'',
        nextUrl:null,
        prev:'',
        prevUrl:null,
      }
    },
    mounted(){
      this.getJobProgress();
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      getJobProgress(){
        getProcess().then(res=>{
          console.log(res);


          if(res.data == ''){
            this.noData=true;
            Toast(this.$t(`message.` + res.message));
          }else{
            this.noData=false;

            this.progress=res.data.data;
            this.current=res.data.current_page;
            this.total=res.data.last_page;
            this.next=res.data.next_page_url;
            //console.log(this.next,this.nextUrl);
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
    }
  }
</script>

<style scoped>
  .list-box{margin-top:.05rem;height:auto;}
</style>
