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
      <div class="search">
        <van-search :placeholder="$t('user.pleaseEnter')" @click="toSearch"/>
      </div>
      <van-swipe class="swipe" :autoplay="3000">
        <van-swipe-item v-for="item in img">
          <img class="s-img" :src="item.value" alt="">
        </van-swipe-item>
      </van-swipe>

      <div class="noData" v-if="this.noData == true">
        <img src="../../../static/images/nodata.png" alt="">
      </div>

      <div class="list" v-for="item in indexList" @click="toDetail(item.id)" v-else>
        <van-row class="list-box">
          <van-col span="3" class="logo-col">
            <img :src="item.url+item.position_company.logo" alt="">
          </van-col>
          <van-col span="14" offset="1" class="des-col">
            <van-row>
              <van-col span="24"><p class="p-name">{{item.name}}</p></van-col>
              <van-col><p class="p-experience">{{item.position_company.nickname}}</p></van-col>
              <van-col span="24"><p class="p-location">{{item.position_company.address}}&nbsp;|&nbsp;{{item.position_year.c_name}}&nbsp;|&nbsp;{{item.position_education.c_name}}</p>
              </van-col>
            </van-row>
          </van-col>
          <van-col span="6" class="more-col">
            <van-row>
              <van-col><p>{{item.position_salary.c_name}}</p></van-col>
            </van-row>
          </van-col>
          <van-col span="24" v-show="item.tag !== null"><p class="p-tags"><span
            v-for="items in item.tag_name">{{items}}</span></p></van-col>
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
  import {index, isPerfect, swiper,nextList,prevList} from '@/server/getData';
  import {Toast} from 'vant';

  export default {
    name: "user",
    data() {
      return {
        next:'',
        title: this.$t('common.index'),
        left: this.$t('common.back'),
        fix: true,
        indexList: [],
        id: 0,
        img: [],
        noData: false,
        current:'',
        total:'',

        nextUrl:'',
        prev:'',
        prevUrl:'',
      }
    },
    mounted() {
      //加载轮播图
      this.getSwiper();
      //判断用户信息是否完整
      isPerfect().then(res => {
        // console.log(res);
        if (res.message == 1.2) {
          //普通用户未完善
          Toast('请先完善你的个人简历');
          this.$router.push({path: 'resumeHeader'})
        }else{
          this.getList();
        }
      });
    },
    methods: {
      //加载首页职位列表
      getList(){
        index().then(res => {
          // console.log(res);
          this.indexList = res.data.data;
          this.id = res.data.data.id;

          if (res.data.data == '') {
            this.noData = true;
            Toast(this.$t(`message.` + res.message));
          } else {
            this.noData = false;

            this.next=res.data.next_page_url;
            // console.log(this.next);
            if(this.next !== null){
              this.nextUrl=this.next.substr(24);
            }
          }
        }).catch(error => {
          console.log(error);
        });
      },
      getSwiper() {
        swiper().then(res => {
          this.img = res.data;
          // console.log(this.img);
        })
      },
      //返回backPage
      onClickLeft() {
        this.$router.push({path: '/backPage'})
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
      toDetail(e) {
        this.$router.push({path: 'detail', query: {id: e}})
      },
      toSearch() {
        this.$router.push({path: 'search'})
      }
    }

  }
</script>

<style scoped>

  .swipe {
    height: 2rem;
    width: 100%;
    margin-bottom: .065rem;
  }

  .swipe .s-img {
    width: 100%;
    height: 2rem;
  }
</style>
