<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!--个人footer-->
    <div class="footers" v-show="$route.meta.navshow" v-if="isOrd == true">
    <van-row>
      <van-col span="8">
        <router-link to="/user">
          <van-icon name="home" />
          <p class="p1">{{ $t("common.index") }}</p>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to="/message">
          <van-icon name="chat" />
          <p class="p1">{{ $t("common.message") }}</p>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to="/me" v-if="this.msg== '1.1'">
          <van-icon name="contact" />
          <p class="p1">{{ $t("common.me") }}</p>
        </router-link>
        <router-link to="/resumeHeader" v-else>
          <van-icon name="contact" />
          <p class="p1">{{ $t("common.me") }}</p>
        </router-link>
      </van-col>
    </van-row>
  </div>

  <!--企业footer-->
  <div class="footers"  v-show="$route.meta.navshow" v-else>
    <van-row>
      <van-col span="8">
        <router-link to="/company">
          <van-icon name="home" />
          <p class="p1">{{ $t("common.index") }}</p>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to="/coMessage">
          <van-icon name="chat" />
          <p class="p1">{{ $t("common.message") }}</p>
        </router-link>
      </van-col>
      <van-col span="8">
        <router-link to="/coMe" v-if="this.msg =='2.1'">
          <van-icon name="contact" />
          <p class="p1">{{ $t("common.me") }}</p>
        </router-link>

        <router-link to="/coInfo" v-else>
          <van-icon name="contact" />
          <p class="p1">{{ $t("common.me") }}</p>
        </router-link>
      </van-col>
    </van-row>
  </div>

  </div>
</template>

<script>
  import {isFirst,isPerfect} from '@/server/getData';
  export default {
    name: 'App',
    data() {
      return {
        show:false,
        isOrd:false,
        msg:'',
      }
    },
    mounted() {
      


      //获取token
      localStorage.setItem('token',this.$route.query.token);
      //设置默认语言
      if(this.$route.query.lang){
        this.$i18n.locale=this.$route.query.lang
      }else{
        this.$i18n.locale='zh_CN'
      }
    },
    methods:{

    }
  }
</script>

<style>
</style>
