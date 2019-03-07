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
      <p class="exp-title"></p>
      <div class="exp-box">
        <textarea rows="6" placeholder="客观全面的自我评价更容易获得企业的好感，快来完善以获得HR的亲睐。" v-model="text">
        </textarea>
      </div>

      <div class="save" @click="saveEvaluation" v-show="this.save == true">
        {{$t('common.save')}}
      </div>
      <div class="save" @click="editEvaluation" v-show="this.save == false">
        {{$t('common.modify')}}
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import {addDescribe,editDescribe,postAddDescribe} from '@/server/getData'
  export default {
    name: "selfEvaluation",
    data() {
      return {
        title: this.$t('common.selfEvaluation'),
        left: this.$t('common.back'),
        fix: true,
        collection: [],
        text:'',
        save:false
      }
    },
    mounted(){
      editDescribe().then(res=>{
        //console.log(res);
        //如果没有有值
        if(res.data == ''){
          //保存
          this.save=true;
        }else{
          //有值
          //修改
          this.save=false;
          this.text=res.data;
        }
        //console.log(this.save);
      })
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      saveEvaluation(){
        let textStr=this.text;
        if(textStr == ''){
          Toast('自我评价不能为空')
        }else{
          addDescribe({describe:this.text}).then(res=>{
            //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
          })
        }
      },
      editEvaluation(){
        let textStr=this.text;
        if(textStr == ''){
          Toast('自我评价不能为空')
        }else{
          postAddDescribe({describe:this.text}).then(res=>{
            //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
          })
        }
      },
    }
  }
</script>

<style scoped>
  .exp-title{font-size: .14rem;text-align: left;padding:.05rem .2rem;color:#888;}
  .exp-box{width:100%;height:2rem;padding:.1rem .2rem;background-color: #fff;font-size: .14rem;}
  .exp-box textarea{width:100%;height:100%;border:none;overflow-x:hidden;resize:none;color:#666;}
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}
</style>
