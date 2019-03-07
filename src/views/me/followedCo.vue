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

      <div class="company-box inner-box" v-for="item in coInfo" @click="toCom(item.id)" v-else>
      <van-row class="innerRow" >
        <van-col span="3" >
          <img class="company-logo" :src="item.url+item.logo" alt="">
        </van-col>
        <van-col span="19" offset="1">
          <van-row>
            <!--<van-col span="7"><p>公司名称：</p></van-col>-->
            <van-col span="17"><p>{{item.nickname}}</p></van-col>
          </van-row>
          <van-row>
            <van-col span="12"><p>行业：{{item.com_trade.c_name}}</p></van-col>
            <van-col span="12"><p>规模：{{item.com_scale.c_name}}</p></van-col>

          </van-row>
        </van-col>
        <van-col span="1" >
          <img class="right" src="../../../static/images/right.png" alt="">
        </van-col>
      </van-row>

    </div>
      <div class="page"  v-show="this.noData == false">
        <van-row>
          <van-col span="24" v-if="this.next !== null"><p @click="getNext" class="next">加载更多</p></van-col>
          <van-col span="24" v-else><p class="unuse">没有更多了</p></van-col>
        </van-row>
      </div>

    </div>
  </div>
</template>

<script>
  import {attentionCom,nextList,prevList} from '@/server/getData'
  import {Toast} from 'vant'
  export default {
    name: "followedCo",
    data() {
      return {
        title: this.$t('common.followedCo'),
        left:this.$t('common.back'),
        fix:true,
        coInfo:[],
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
      this.getFollowed();
    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
      //获取关注的公司
      getFollowed(){
        attentionCom().then(res=>{
          console.log(res);
          if(res.data.length == 0){
            this.noData=true;
            Toast(this.$t(`message.` + res.message));
          }else{
            this.noData=false;

            this.coInfo=res.data.data;
            // this.current=res.data.current_page;
            // this.total=res.data.last_page;
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
      //去公司页
      toCom(e){
        let id = e;
        this.$router.push({path: '/comDetail',query: {id: e}})
      }
    }
  }
</script>

<style scoped>
  .inner-box {padding: .1rem .2rem;background-color:#fff;margin-bottom:.065rem;margin-top:.05rem;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;height:.25rem;line-height: .25rem;}
  .company-box{padding: 0 .2rem 0 .15rem;}
  .company-box .innerRow{padding:.1rem 0;}
  .company-box .right{height:.15rem;width:.15rem;margin-top:.16rem;}
  .company-box .company-logo{height:.3rem;width:.3rem;margin-top:.1rem;}
</style>
