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
      <div class="tags">
        <p class="line">{{$t('me.showYour')}}</p>
        <div class="chooice-box">
          <span class="normal" v-for="(item,index) in tags" @click="chooiceTag(item)" :class="{select:item.select}">{{item.c_name}}</span>
        </div>
      </div>

      <div class="save" @click="postTag" v-if="this.isFirst == ''">
        {{$t('common.save')}}
      </div>
      <div class="save" @click="postEdit" v-else>
        {{$t('common.modify')}}
      </div>

    </div>
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import Vue from 'vue';
  import {isTag, getResumetag, postUserTag, editTag,postEditTag} from '@/server/getData';

  export default {
    name: "tags",
    data() {
      return {
        title: this.$t('common.tags'),
        left: this.$t('common.back'),
        fix: true,
        data: {
          tag: [],
        },
        tags: [],
        active: false,
        editTag: [],
      }
    },
    created() {

    },
    mounted() {
      //获取全部标签
      this.getTag();
      //判断是否第一次
      this.isFirst();
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);

      },
      //判断是修改标签还是新建标签
      isFirst() {
        editTag().then(res => {
          this.isFirst = res.data.tag_id;
          // //console.log(this.isFirst);

          if (this.isFirst == '') {
            this.getTag();
          } else {
            this.edit();
            // this.getTag();
          }
        });
      },
      //初次获取全部标签
      getTag() {
        var _this = this;
        getResumetag().then(res => {
          // //console.log(res);
          this.tags = res.data;
          //console.log(this.tags);
          return this.tags
        });
      },
      //修改标签的获取全部标签
      edit() {
        editTag().then(res => {
          this.data.tag = res.data.tag_id;
          //console.log(this.data.tag);
          //console.log(this.tags);
          for (var i = 0; i < this.data.tag.length; i++) {
            for (var j = 0; j < this.tags.length; j++) {
              if (this.data.tag[i] == this.tags[j].c_id) {
                //console.log(11111111111111);
                Vue.set(this.tags[j], 'select', true)
              }
            }
          }
          // //console.log(this.data.tag)
          // //console.log(this.tags)
        });
      },
      //选择标签时的方法
      chooiceTag(item) {
        var index = this.data.tag.indexOf(String(item.c_id));
        if (index > -1) {
          this.data.tag.splice(index, 1);
          Vue.set(item, 'select', false)
        } else {
          Vue.set(item, 'select', true);
          this.data.tag.push(String(item.c_id));
        }
        //console.log(index);
        //console.log(this.data.tag);
      },
      //第一次新增标签
      postTag() {
        let a=this.data.tag.toString();
        //console.log(a);
        let tagStr=this.data.tag;
        if(tagStr == ''){
          Toast('请选择特长标签')
        }else{
          postUserTag({tag:a}).then(res => {
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
      //保存修改后的标签
      postEdit(){
        let a=this.data.tag.toString();
        //console.log(a);
        let tagStr=this.data.tag;
        if(tagStr == ''){
          Toast('请选择特长标签')
        }else{
          postEditTag({tag:a}).then(res=>{
            //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
          })
        }
      }


    }

  }
</script>

<style scoped>
  .tags {height: auto;width: 100%;}
  .line {font-size: .14rem;text-align: left;padding: .05rem .3rem;color: #888;}
  .chooice-box .normal.select {color: #fff;background-color: #FD8000;}
  .chooice-box {position: absolute;background-color: #fff;padding: .2rem .3rem 0 .3rem;}
  .chooice-box .normal {font-size: .14rem;display: inline-block;height: .3rem;line-height: .3rem;width: auto;padding: 0 .15rem;border: 1px solid #FD8000;margin-bottom: .2rem;margin-right: .2rem;float: left;color: #FD8000;}
  .save {width: 100%;height: .5rem;line-height: .5rem;font-size: .16rem;color: #fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}
</style>
