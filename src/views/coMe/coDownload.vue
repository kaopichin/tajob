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

    </div>
  </div>
</template>

<script>
  import {getDownList} from '@/server/getData';
  import { Toast } from 'vant';
  export default {
    name: "coDownload",
    data() {
      return {
        title: this.$t('common.downloadedResume'),
        left: this.$t('common.back'),
        fix: true,
      }
    },
    mounted(){
      this.getDown();
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      getDown(){
        getDownList().then(res=>{
          //console.log(res);
          if(res.data == ''){
            Toast(this.$t(`message.` + res.message));
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
