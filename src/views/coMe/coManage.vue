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

      <div class="list" v-for="item in position" @click="toEdit(item.id)" v-else>
        <van-row  class="list-box" >
          <van-col span="3" class="logo-col">
          <img :src="item.url+item.position_company.logo" alt="">
        </van-col>
          <van-col span="14" offset="1" class="des-col">
            <van-row>
              <van-col span="24"><p class="p-name">{{item.name}}</p></van-col>
              <van-col><p class="p-experience">{{item.position_company.nickname}}</p></van-col>
              <van-col span="24"><p class="p-location">{{item.address}}&nbsp;|&nbsp;{{item.position_year.c_name}}&nbsp;|&nbsp;{{item.position_education.c_name}}</p></van-col>
            </van-row>
          </van-col>
          <van-col span="6" class="more-col">
            <van-row>
              <van-col span="14" offset="4" class="shenhe">
                <p v-show="item.state == '1'">{{$t('coMe.examinationPassed')}}</p>
                <p v-show="item.state == '2'">{{$t('coMe.unexamination')}}</p>
                <p v-show="item.state == '0'">{{$t('coMe.examinationFailure')}}</p>
                </van-col>
              <van-col span="24" class="salary"><p>{{item.position_salary.c_name}}</p></van-col>
            </van-row>
          </van-col>
          <van-col span="24" v-show="item.tag !== null"><p class="p-tags" ><span v-for="items in item.tag_name" >{{items}}</span></p></van-col>
        </van-row>

        <div class="page">
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
  import { Toast } from 'vant';
  import {getPositionList} from '@/server/getData';
  export default {
    name: "coManage",
    data() {
      return {
        title: this.$t('common.managePosition'),
        left: this.$t('common.back'),
        fix: true,
        position:[],
        other:[],
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
      this.getList();
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      //获取职位列表
      getList(){
        getPositionList().then(res=>{
          console.log(res);

          if(res.data.length == 0){
            this.noData=true;
            Toast(this.$t(`message.` + res.message));
          }else{
            this.noData=false;

            this.position=res.data.data;
            this.other=res.data;

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
        });
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
      //去修改页
      toEdit(e){
        this.$router.push({path: 'editPost',query: {id: e}})
      }
    }
  }
</script>

<style scoped>
  .list{padding-top:.05rem;}
  .more-col{padding:0;}
  .salary{padding-top:.17rem;}
  .shenhe{padding-top:.1rem;}
  .shenhe p{font-weight: normal;color:#fff;background-color: lightskyblue;text-align: center;}
  .center-title{font-size: .14rem;text-align: center;padding:.05rem .2rem;color:#888;}
</style>
