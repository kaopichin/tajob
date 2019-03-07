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
      <div class="company-content inner-box">
        <van-row class="p-line no-line">
          <van-col span="8"><p>{{$t('me.certificateName')}}</p></van-col>
          <van-col span="14"><p class="right-van"><input type="text" placeholder="必填" v-model="data.name">
          </p></van-col>
        </van-row>

        <div @click="timer">
          <van-row class="p-line">
            <van-col span="6"><p>{{$t('me.timeYear')}}</p></van-col>
            <van-col span="14" offset="2"><p class="right-van">
              <input type="text" placeholder="请选择" readonly v-model="times"></p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="save" @click="saveCert" v-show="isEdit == false">
        {{$t('common.save')}}
      </div>
      <div class="save" @click="saveEdit" v-show="isEdit == true">
        {{$t('common.modify')}}
      </div>

      <van-actionsheet v-model="showTime">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="confirm"
          @cancel="cancel"
        />
      </van-actionsheet>
    </div>
  </div>
</template>

<script>
  import {addCredent,getCredent,editCredent} from '@/server/getData';
  import {Toast} from 'vant'

  export default {
    name: "academicCertificate",
    data() {
      return {
        title: this.$t('common.academicCertificate'),
        left: this.$t('common.back'),
        fix: true,
        showTime: false,
        minDate: new Date(1900, 1),
        maxDate: new Date(),
        currentDate: new Date(2010, 8),
        data: {
          name: '',
          time: '',
          id:''
        },
        times:'',
        cert:[],
        isEdit:false
      }
    },
    mounted(){
      let cer_id = this.$route.query.id;
      this.data.id= cer_id;
      if(cer_id){
        this.getInfo(cer_id);
      }

    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      getInfo(e){
        getCredent({id:e}).then(res=>{
          //console.log(res);
          if(res.data !== ''){
            this.isEdit = true;
            //console.log(this.isEdit);

            this.data.name=res.data.name;
            let a=new Date(res.data.time * 1000);
            let aY=a.getFullYear() + '年 ';
            let aM=(a.getMonth()+1 < 10 ? '0'+(a.getMonth()+1) : a.getMonth()+1) + '月';
            this.data.time=res.data.time;
            this.times=aY + aM;
          }
        })
      },
      timer() {
        this.showTime = true;
      },
      //修改日期格式
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      confirm(val) {
        this.data.time = Date.parse(val) /1000;
        // this.data.time = val.toLocaleString();
        var Y=val.getFullYear() + '年 ';
        var M=(val.getMonth()+1 < 10 ? '0'+(val.getMonth()+1) : val.getMonth()+1) + '月';
        this.times=Y+M;
        this.showTime = false;
      },
      cancel() {
        this.showTime = false;
      },
      saveCert() {
        //console.log(this.data);
        let nameStr=this.data.name;
        let timeStr=this.data.time;
        if(nameStr == ''){
          Toast('证书名称不能为空')
        }else if(timeStr == ''){
          Toast('请选择时间年份')
        }else{
          addCredent(this.data).then(res => {
            //console.log(res);
            this.cert=res.data;
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
          });
        }

      },
      saveEdit(){
        let nameStr=this.data.name;
        let timeStr=this.data.time;
        if(nameStr == ''){
          Toast('证书名称不能为空')
        }else if(timeStr == ''){
          Toast('请选择时间年份')
        }else{
          editCredent(this.data).then(res=>{
            //console.log(this.data);
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
  .inner-box {padding: 0 .2rem .1rem .2rem;background-color:#fff;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .inner-box .p-line{border-top:1px solid #f2f2f2;vertical-align:middle;height: .4rem;line-height: .4rem;padding-top:.1rem;}
  .inner-box .no-line{border-top:none;}
  .inner-box .right-van{text-align: right;}
  .inner-box input{border:none;text-align: right;}
  .resume-more img{height:.15rem;width:.15rem;margin-bottom:.1rem;}
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}
  .van-picker {font-size: .16rem;}
</style>
