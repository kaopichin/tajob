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
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('company.invitedPerson')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van" ><input type="text" :placeholder="user.username"  readonly  v-model="form.beInvite"/></p></van-col>
        </van-row>
        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.positionName')}}</p></van-col>
          <van-col span="14" offset="2">
            <p class="right-van">
            <select name="" id="" v-model="posi" value="请选择" @change="selectPosition">
              <option :value="item.name" selected = "selected" v-for="item in position" class="font-16">{{item.name}}</option>
            </select>
            </p>
          </van-col>
        </van-row>


          <van-row class="p-line">
            <div @click='selectData'>
            <van-col span="8"><p>{{$t('company.interviewDate')}}</p></van-col>
            <van-col span="12" offset="2"><p class="right-van"><input v-model="form.datas" type="text" readonly :placeholder="inviteData"/></p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
            </div>
          </van-row>


        <van-row class="p-line">
          <van-col span="10"><p>{{$t('company.interviewLocation')}}</p></van-col>
          <van-col span="14" ><p class="right-van"><input type="text" v-model="form.address" :placeholder="data.address"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.phone')}}</p></van-col>
          <van-col span="18" ><p class="right-van"><input type="text" v-model="form.phone" :placeholder="comUser.mobilePhone"></p></van-col>
        </van-row>
      </div>

      <van-actionsheet v-model="showDater" class="font-16">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          :min-date="minDate"
          :max-date="maxDate"
          :min-hour="minHour"
          :max-hour="maxHour"
          :formatter="formatter"
          @confirm="confirm"
          @cancel="cancel"
        />
      </van-actionsheet>
      

      <div class="send" @click="sendInvite">
        {{$t('common.send')}}
      </div>
      

    </div>
  </div>
</template>

<script>
  import {interviewGet,interviewPost} from '@/server/getData';
  import { Popup } from 'vant';
  import {Toast} from 'vant';
  export default {
    name: "invite",
    data() {
      return {
        title: this.$t('common.invite'),
        left: this.$t('common.back'),
        fix: true,
        indexList: [],
        data:[],
        id: 0,
        user:[],
        comUser:[],
        show1: false,
        position:[],
        posi:'',
        showDater:false,
        showTimer:false,
        minHour: 9,
        maxHour: 18,
        minDate: new Date(),
        maxDate: new Date(2019,11,31),
        currentDate: new Date(),
        form:{
          resume_id:'',//简历ID
          c_uid:'',//邀请人ID
          p_uid:'',//被邀请人ID
          company_id:'',//公司ID
          position_id:'',//职位ID
          time:'',//时间
          address:'',//地址
          phone:'',//电话
        },
        inviteData:'',
        inviteTime:'',
      }
    },
    mounted() {
      let invite_id = this.$route.query.id;
      this.getInviteInfo(invite_id);
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      //获取邀请页信息
      getInviteInfo(invite_id) {
        //console.log(invite_id);
        interviewGet({id: invite_id}).then(res => {
          if(res.data == ''){
            Toast(this.$t(`message.` + res.message));
          }else{
            this.data=res.data;
            this.comUser=res.data.com_user;
            this.user=res.data.user;
            this.position=res.data.position;
            //console.log(res);
          }
        })
      },
      //选择职位
      selectPosition(ele){
        for(let i=0;i<this.position.length;i++){
          if(this.position[i].name==ele.target.value){
            this.form.position_id=this.position[i].id;
          }
        }
        //console.log(this.form.position_id);
      },
      //显示日期选择框
      selectData(){
        this.showDater=true;
      },
      //修改日期格式
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }else if (type === 'day') {
          return `${value}日`
        }else if (type === 'hour') {
          return `${value}时`
        }else if (type === 'minute') {
          return `${value}分`
        }
        return value;
      },
      //日期取消按钮
      cancel(){
        this.showDater=false;
      },
      //选择日期
      confirm(val){
        this.form.time = Date.parse(val) /1000;
        var Y=val.getFullYear() + '年 ';
        var M=(val.getMonth()+1 < 10 ? '0'+(val.getMonth()+1) : val.getMonth()+1) + '月 ';
        var D=val.getDate() + '日 ';
        var H=val.getHours() + '时 ';
        this.inviteData = Y+M+D+H;
        this.showDater=false;
      },
      //发送面试邀请
      sendInvite(){
        this.form.resume_id=this.$route.query.id;
        this.form.c_uid=this.comUser.memberId;
        this.form.p_uid=this.user.memberId;
        this.form.company_id=this.data.comid;
        if(this.form.address == ''){
          this.form.address=this.data.address;
        }
        if(this.form.phone == ''){
          this.form.phone=this.comUser.mobilePhone;
        }
        //console.log(this.form);
        interviewPost(this.form).then(res=>{
          //console.log(res);
          if(res.data == ''){
            Toast(this.$t(`message.` + res.message));
          }else if(res.message == 'lang015'){
            this.$router.push({path:'/company'});
            setTimeout(()=>{
              this.$router.go(-1);
            },1000);
          }
        });
        // this.form.beInvite=this.data.name;
        // this.form.datas=this.inviteData;
        // this.form.times=this.inviteTime;

      }
    }
  }
</script>

<style scoped>
  .inner-box {
    padding: .1rem .2rem;
    background-color: #fff;
    margin-bottom: .065rem;
  }

  .inner-box p {
    text-align: left;
    font-size: 14px;
    line-height: .25rem;
    overflow: hidden;
  }

  .inner-box .p-line {
    border-top: 1px solid #f2f2f2;
    vertical-align: middle;
    height: .4rem;
    line-height: .4rem;
    padding-top: .1rem;
  }

  .inner-box  .p-line:first-child {
    border-top: none;
  }

  .inner-box .right-van {
    text-align: right;
    color: #888;
  }
  .inner-box .resume-more img{height:.15rem;width:.15rem;margin-bottom:.1rem;}
  .font-16{font-size: .16rem;}
  .inner-box input{border:none;text-align: right;}
  .inner-box select{border:none;outline: none;color:#888;font-size: .14rem;}
  .inner-box option{font-size: .14rem;}
  .send{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top:.5rem;position: fixed;bottom:0;}
</style>
