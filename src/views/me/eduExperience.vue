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
          <van-col span="4"><p>{{$t('me.school')}}</p></van-col>
          <van-col span="16" offset="2"><p class="right-van"><input type="text" placeholder="必填" v-model="data.school"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="4"><p>{{$t('me.major')}}</p></van-col>
          <van-col span="16" offset="2"><p class="right-van"><input type="text" placeholder="必填" v-model="data.speciality"></p></van-col>
        </van-row>

        <div @click="showDegree">
          <van-row class="p-line">
            <van-col span="4"><p>{{$t('me.education')}}</p></van-col>
            <van-col span="16" offset="2"><p class="right-van"><input type="text" placeholder="必选" readonly v-model="degree"></p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>

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

      <div class="save" @click="saveEdu" v-show="isEdit == false">
        {{$t('common.save')}}
      </div>
      <div class="save" @click="saveEdit" v-show="isEdit == true">
        {{$t('common.modify')}}
      </div>

      <van-actionsheet
        v-model="showDeg"
        :actions="actions"
        @select="selectDeg"
        cancel-text="取消"
      />

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
  import {addEducation,getEducations,editEducation} from '@/server/getData'
  import {Toast} from 'vant'
  export default {
    name: "eduExperience",
    data() {
      return {
        title: this.$t('common.eduExperience'),
        left: this.$t('common.back'),
        fix: true,
        showDeg:false,
        actions: [
          {
            name: '小学'
          },
          {
            name: '初中'
          },
          {
            name:'高中'
          },
          {
            name:'大专'
          },
          {
            name:'本科'
          },
          {
            name:'硕士'
          },
          {
            name:'博士'
          }
        ],
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
        data:{
          school:'',
          speciality:'',
          education:'',
          start_time:'',
          end_time:'',
          id:''
        },
        isEdit:false,
      }
    },
    mounted(){
      let edu_id = this.$route.query.id;
      this.data.id= edu_id;
      if(edu_id){
        this.getInfo(edu_id);
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      getInfo(e){
        //console.log(e);
        getEducations({id:e}).then(res=>{
          //console.log(res);
          if(res.data !== ''){
            this.isEdit = true;
            //console.log(this.isEdit);

            this.data.school=res.data.school;
            this.data.speciality=res.data.speciality;
            this.degree=res.data.education;
            this.data.education=res.data.education;
            let a=new Date(res.data.start_time * 1000);
            let b=new Date(res.data.end_time * 1000);
            let aY=a.getFullYear() + '年 ';
            let aM=(a.getMonth()+1 < 10 ? '0'+(a.getMonth()+1) : a.getMonth()+1) + '月';
            let bY=b.getFullYear() + '年 ';
            let bM=(b.getMonth()+1 < 10 ? '0'+(b.getMonth()+1) : b.getMonth()+1) + '月';
            this.data.start_time=res.data.start_time;
            this.data.end_time=res.data.end_time;
            this.startDate=aY + aM;
            this.endDate=bY + bM;
          }

        });
      },
      showDegree(){
        this.showDeg=true;
      },
      selectDeg(item){
        this.showDeg = false;
        this.degree=item.name;
        this.data.education=item.name;
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
        this.data.start_time=Date.parse(val) /1000;
        var Y=val.getFullYear() + '年 ';
        var M=(val.getMonth()+1 < 10 ? '0'+(val.getMonth()+1) : val.getMonth()+1) + '月';
        this.startDate = Y+M;
        this.showStart=false;
      },
      confirmE(val){
        this.data.end_time=Date.parse(val) /1000;
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
      saveEdu(){
        let schoolStr=this.data.school;
        let specialityStr=this.data.speciality;
        let educationStr=this.data.education;
        let startStr=this.data.start_time;
        let endStr=this.data.end_time;

        if(schoolStr == ''){
          Toast('学校名称不能为空')
        }else if(specialityStr == ''){
          Toast('专业不能为空')
        }else if(educationStr == ''){
          Toast('学历不能为空')
        }else if(startStr == ''){
          Toast('请选择开始时间')
        }else if(endStr == ''){
          Toast('请选择结束时间')
        }else{
          addEducation(this.data).then(res=>{
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
        let schoolStr=this.data.school;
        let specialityStr=this.data.speciality;
        let educationStr=this.data.education;
        let startStr=this.data.start_time;
        let endStr=this.data.end_time;

        if(schoolStr == ''){
          Toast('学校名称不能为空')
        }else if(specialityStr == ''){
          Toast('专业不能为空')
        }else if(educationStr == ''){
          Toast('学历不能为空')
        }else if(startStr == ''){
          Toast('请选择开始时间')
        }else if(endStr == ''){
          Toast('请选择结束时间')
        }else{
          editEducation(this.data).then(res=>{
            //console.log(res);
            //console.log(this.data);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.go(-1);
              },1000);
            }
          });
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
  /*.exp-box{width:100%;height:2rem;padding:.1rem .2rem;background-color: #fff;font-size: .16rem;}*/
  .van-picker{font-size: .14rem;}
  .exp-box textarea{width:100%;height:100%;border:none;overflow-x:hidden;resize:none;}
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}
</style>
