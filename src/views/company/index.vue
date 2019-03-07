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

      <div class="out-box" v-else>
        <div class="list" v-for="(item,index) in resList" :key="index" @click="toDetail(item.id)">
          <van-row  class="list-box">
            <van-col span="3" class="logo-col">
              <img :src="item.log" alt="">
            </van-col>
            <van-col span="14" offset="1" class="des-col">
              <van-row>
                <van-col span="24"><p class="p-name">{{item.name}}</p></van-col>
                <!--<van-col><p class="p-experience">{{item.position_company.nickname}}</p></van-col>-->
                <van-col span="24"><p class="p-location"><span v-if="item.sex == 1">男</span><span v-else>女</span>&nbsp;|&nbsp;{{item.born_year}} 岁&nbsp;|&nbsp;{{item.resume_experience.c_name}}&nbsp;|&nbsp;{{item.resume_district.categoryname}}</p></van-col>
                <van-col span="24"><p class="p-salary">期望薪资：<span>{{item.resume_salary.c_name}}</span></p></van-col>
              </van-row>
            </van-col>
            <van-col span="6" class="more-col">
              <van-row>
                <van-col ><p>{{item.resume_position.categoryname}}</p></van-col>
              </van-row>
            </van-col>
            <van-col span="24" v-show="item.tag !== null"><p class="p-tags" ><span v-for="items in item.tag_name" >{{items}}</span></p></van-col>
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
  </div>
</template>

<script>
  import {resumeList,nextList,prevList,isPerfect} from '@/server/getData';
  import {Toast} from 'vant';
  export default {
    name: "index",
    data() {
      return {
        title: this.$t('common.index'),
        left: this.$t('common.back'),
        fix:true,
        resList:[],
        experience:[],
        avatar:'',
        tags:[],
        noData:false,
        age:'',
        current:'',
        total:'',
        next:'',
        nextUrl:'',
        prev:'',
        prevUrl:'',
      }
    },
    mounted(){
      //判断用户信息是否完整
      isPerfect().then(res => {
        console.log(res);
        if (res.message == 2.2) {
          //普通用户未完善
          Toast('请先完善你的企业信息');
          this.$router.push({path: '/coInfo'})
        }
      });
      //加载首页简历列表
      resumeList().then(res=>{
        //console.log(res);
        if(res.data.length == 0){
          this.noData=true;
          Toast(this.$t(`message.` + res.message));
        }else{
          this.noData=false;

          this.resList=res.data.data;
          this.tags=res.data.data.tag_name;
          //console.log(this.tags);
          //console.log(this.resList);
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
      }).catch(error=>{
        //console.log(error);
      });
    },
    methods:{
      //返回backPage
      onClickLeft() {
        this.$router.push({path: '/backPage'})
      },
      toDetail(e){
        console.log(e);
        this.$router.push({path: 'resumeDetail',query: {id: e}})
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
  .out-box{padding-top:.05rem;}
  .p-tags{overflow: hidden;}
  .p-salary{font-size: .14rem;color:#777;overflow: hidden;line-height: .2rem;height:.2rem;text-overflow: ellipsis;}
  .p-salary span{color: #0180CF;}
</style>
