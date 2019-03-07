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
          <van-col span="8"><p>{{$t('coMe.companyName')}}</p></van-col>
          <van-col span="14"><p class="right-van"><input type="text" placeholder="必填" v-model="data.companyname"></p></van-col>
        </van-row>

        <van-row class="p-line">


          <van-col span="8"><p>{{$t('coMe.positionName')}}</p></van-col>
          <van-col span="14"><p class="right-van"><input type="text" placeholder="必填" v-model="data.jobs"></p></van-col>
        </van-row>

        <div @click="start">
          <van-row class="p-line">
            <van-col span="6"><p>{{$t('me.startTime')}}</p></van-col>
            <van-col span="14" offset="2"><p class="right-van"><input type="text" placeholder="必选" readonly v-model="startDate"></p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>

        <div @click="end">
          <van-row class="p-line">
            <van-col span="6"><p>{{$t('me.endTime')}}</p></van-col>
            <van-col span="14" offset="2"><p class="right-van"><input type="text" placeholder="必选" readonly v-model="endDate"></p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>
      </div>

      <p class="exp-title">{{$t('me.jobDescription')}}（{{$t('common.optional')}}）</p>
      <div class="exp-box">
        <textarea rows="6" placeholder="描述您在岗职位的工作内容或职责范围等" v-model="data.duty">
        </textarea>
      </div>

      <div class="save" @click="saveWork" v-show="isEdit == false">
        {{$t('common.save')}}
      </div>

      <div class="save" @click="saveEdit" v-show="isEdit == true">
        {{$t('common.modify')}}
      </div>

      <van-actionsheet v-model="showStart">
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

      <van-actionsheet v-model="showEnd">
        <van-datetime-picker
          v-model="currentDateE"
          type="year-month"
          :min-date="minDateE"
          :max-date="maxDateE"
          :formatter="formatter"
          @confirm="confirmE"
          @cancel="cancelE"
        />
      </van-actionsheet>

    </div>
  </div>

</template>

<script>
  import {addWork,getWork,editWork} from '@/server/getData'
  import {Toast} from 'vant'

  export default {
    name: "workExperience",
    data() {
      return {
        title: this.$t('common.workExperience'),
        left: this.$t('common.back'),
        fix: true,
        showArea: false,
        advantage:'',
        data:{
          companyname:'',
          jobs:'',
          start_time:'',
          end_time:'',
          duty:'',
          id:0
        },
        degree:'',
        showStart:false,
        showEnd:false,
        minDate: new Date(1900, 1),
        maxDate: new Date(),
        currentDate: new Date(2010,8),
        minDateE: new Date(1900,1),
        maxDateE: new Date(),
        currentDateE: new Date(2010,8),
        startDate:'',
        endDate:'',
        isEdit:false,
      }
    },
    mounted(){
      let work_id = this.$route.query.id;
      this.data.id= work_id;
      if(this.data.id){
        this.getInfo(work_id);
      }

    },
    methods:{
      onClickLeft() {
        this.$router.go(-1);
      },
      getInfo(e){
        getWork({id:e}).then(res=>{
          //console.log(res);
          if(res.data !== ''){
            this.isEdit = true;
            //console.log(this.isEdit);
            this.data.companyname=res.data.companyname;
            this.data.jobs=res.data.jobs;
            let a=new Date(res.data.start_time * 1000);
            let b=new Date(res.data.end_time * 1000);
            let aY=a.getFullYear() + '年';
            let aM=(a.getMonth()+1 < 10 ? '0'+(a.getMonth()+1) : a.getMonth()+1) + '月';
            let bY=b.getFullYear() + '年';
            let bM=(b.getMonth()+1 < 10 ? '0'+(b.getMonth()+1) : b.getMonth()+1) + '月';
            this.startDate=aY + aM;
            this.endDate=bY + bM;
            this.data.start_time=res.data.start_time;
            this.data.end_time=res.data.end_time;
            this.data.duty=res.data.duty;
          }
        })
      },
      start(){
        this.showStart=true;
      },
      end(){
        this.showEnd=true;
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
      confirm(val){
        this.data.start_time = Date.parse(val) /1000;
        var Y=val.getFullYear() + '年 ';
        var M=(val.getMonth()+1 < 10 ? '0'+(val.getMonth()+1) : val.getMonth()+1) + '月';
        this.startDate = Y+M;
        this.showStart=false;
      },
      confirmE(val){
        this.data.end_time = Date.parse(val) /1000;
        var Y=val.getFullYear() + '年 ';
        var M=(val.getMonth()+1 < 10 ? '0'+(val.getMonth()+1) : val.getMonth()+1) + '月';
        this.endDate = Y+M;
        this.showEnd=false;
      },
      cancel(){
        this.showStart=false;
      },
      cancelE(){
        this.showEnd=false;
      },
      saveWork(){
        //console.log(this.data);
        let comStr=this.data.companyname;
        let jobsStr=this.data.jobs;
        let startStr=this.data.start_time;
        let endStr=this.data.end_time;

        let comReg=/^[\u4E00-\u9FA5]{2,15}$/ ;

        if(comStr == ''){
          Toast('公司名称不能为空')
        }else if(!comReg.test(comStr)){
          Toast('公司名称需为2-5个汉字')
        }else if(jobsStr == ''){
          Toast('职位名称不能为空')
        }else if(startStr == ''){
          Toast('开始时间不能为空')
        }else if(endStr == ''){
          Toast('结束时间不能为空')
        }else{
          addWork(this.data).then(res=>{
            //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
          });
        }
        //console.log(this.data);
      },
      saveEdit(){
        let comStr=this.data.companyname;
        let jobsStr=this.data.jobs;
        let startStr=this.data.start_time;
        let endStr=this.data.end_time;

        let comReg=/^[\u4E00-\u9FA5]{2,15}$/ ;

        if(comStr == ''){
          Toast('公司名称不能为空')
        }else if(!comReg.test(comStr)){
          Toast('公司名称需为2-5个汉字')
        }else if(jobsStr == ''){
          Toast('职位名称不能为空')
        }else if(startStr == ''){
          Toast('开始时间不能为空')
        }else if(endStr == ''){
          Toast('结束时间不能为空')
        }else{
          editWork(this.data).then(res=>{
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
    },

  }
</script>

<style scoped>
  .inner-box {padding: 0 .2rem .1rem .2rem;background-color:#fff;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .inner-box .p-line{border-top:1px solid #ededed;vertical-align:middle;height: .4rem;line-height: .4rem;padding-top:.1rem;}
  .inner-box .no-line{border-top:none;}
  .inner-box .right-van{text-align: right;}
  .inner-box input{border:none;text-align: right;}
  .resume-more img{height:.15rem;width:.15rem;margin-bottom:.1rem;}
  .exp-title{font-size: .14rem;text-align: left;padding:.05rem .2rem;color:#888;}
  .exp-box{width:100%;height:2rem;padding:.1rem .2rem;background-color: #fff;font-size: .14rem;}
  .exp-box textarea{width:100%;height:100%;border:none;overflow-x:hidden;resize:none;}
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}
  .van-picker{font-size: .14rem;}
</style>
