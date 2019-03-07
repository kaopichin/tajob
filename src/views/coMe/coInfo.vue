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

      <van-popup v-model="show">
        <van-loading  color="white" v-model="show"/>
      </van-popup>

      <div class="company-content inner-box">
        <van-row class="p-line">
          <van-col span="10"><p>{{$t('coMe.companyLogo')}}</p></van-col>
          <van-col span="12" offset="2"><p class="right-van">
            <van-uploader :after-read="onRead">
              <van-icon name="photograph" />
            </van-uploader>
            <img :src=imgSrc alt="" class="resume-img" v-if="imgSrc !== ''">
            <img src="../../../static/images/camera.png" alt="" class="resume-img" v-else>
          </p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.companyName')}}</p></van-col>
          <van-col span="14"><p class="right-van"><input type="text" placeholder="公司全称2-15个汉字" v-model="data.name"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="4"><p>{{$t('coMe.abbreviation')}}</p></van-col>
          <van-col span="16" offset="2"><p class="right-van"><input type="text" placeholder="请输入" v-model="data.nickname"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.industry')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">
            <span class="for-select" v-text="trade_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="edus" v-model="trade_cn" @change="selectTrade" name="dis">
              <option v-for="item in trade" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.scale')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">
            <span class="for-select" v-text="scale_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="exprs" v-model="scale_cn" @change="selectScale" name="dis">
              <option v-for="item in scale" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.nature')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">
            <span class="for-select" v-text="nature_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="currents" v-model="nature_cn" @change="selectNature" name="dis">
              <option v-for="item in nature" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <div @click="start">
          <van-row class="p-line">
            <van-col span="6"><p>{{$t('coMe.established')}}</p></van-col>
            <van-col span="14" offset="2"><p class="right-van"><input type="text" placeholder="必选" readonly v-model="startDate"></p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.phone')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van"><input type="number" placeholder="请输入公司电话" v-model="data.phone"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.email')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van"><input type="text" placeholder="请输入电子邮箱" v-model="data.email"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.companyAddress')}}</p></van-col>
          <van-col span="14">
            <p class="right-van">
              <input type="text" placeholder="请输入公司地址" v-model="data.address">
            </p>
          </van-col>
        </van-row>

      </div>

      <p class="exp-title">{{$t('coMe.companyProfile')}}（{{$t('common.required')}}）</p>
      <div class="exp-box">
        <textarea rows="6" placeholder="详细的公司介绍，能更好的吸引人才" v-model="data.introduce">
        </textarea>
      </div>

      <div class="tags">
        <p class="line">{{$t('coMe.showJobTags')}}</p>
        <div class="chooice-box">
          <span class="normal" v-for="(item,index) in tags" @click="chooiceTag(item)" :class="{select:item.select}">{{item.c_name}}</span>
        </div>
      </div>

      <div class="save" @click="saveInfo" v-show="isEdit == false">
        {{$t('common.save')}}
      </div>

      <div class="save" @click="editInfo" v-show="isEdit == true">
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

    </div>
  </div>
</template>

<script>
  import {getAddCompany,uploadImg,postAddCompany,getEditCompany,postEditCompany,isPerfect} from '@/server/getData';
  import { Toast } from 'vant';
  import Vue from 'vue';
  export default {
    name: "coInfo",
    data() {
      return {
        title: this.$t('common.companyInfo'),
        left: this.$t('common.back'),
        fix: true,
        imgSrc:'',
        data:{
          name:'',//瑞之源2
          nickname:'',//西安瑞之源教育科技有限公司2
          trade_id:'',//行业ID
          scale_id:'',//规模ID
          nature_id:'',//性质ID
          imgbase:'',//base64
          imgname:'',//qianzhui
          delimg:'',//上一张图片路径
          phone:'',//029-2965394
          email:'',//ruizhiyuan@yuan.cn
          address:'',//陕西省西安市长安区书香路
          start_time:'',//成立时间时间戳
          introduce:'',//公司简介
          tag:[],//标签
        },
        pic:{
          name:'',
          img:''
        },
        trade:[],
        trade_cn:'',
        scale:[],
        scale_cn:'',
        nature:[],
        nature_cn:'',
        showStart:false,
        minDate: new Date(1900, 1),
        maxDate: new Date(),
        currentDate: new Date(2010,8),
        startDate:'',
        isEdit:false,
        show: true,
        tags:[],
      }
    },
    mounted(){
      this.show=true;
      this.getInfo();
      //判断是否有企业基本信息
      this.isBase();
      setTimeout(()=>{
        this.show=false;
      },550);
    },
    methods:{
      onClickLeft() {
        isPerfect().then(res=>{
          console.log(res);
          if(res.message == 2.1){
            //  企业用户已完善
            this.$router.go(-1);
          }else if(res.message == 2.2){
            // 企业用户未完善
            this.$router.push('/backPage');
          }
        });
      },
      //先获取新增所需信息
      getInfo(){
        getAddCompany().then(res=>{
          //console.log(res);
          this.trade=res.data.trade;
          this.scale=res.data.scale;
          this.nature=res.data.com_type;
          this.tags=res.data.tag;
          //console.log(this.trade);
          if(res.data == ''){
            Toast(this.$t(`message.` + res.message));
          }
        })
      },
      //判断是否有企业基本信息
      isBase(){
        isPerfect().then(res=>{
          //console.log(res);
          if(res.message == 2.1){
            //普通用户已完善
            this.getEdit();
          }else if(res.message == 2.2){
            //普通用户未完善
          }
        });
      },
      //获取企业信息是否有值
      getEdit(){
        getEditCompany().then(res=>{
          //console.log(res);
          if(res.data == ''){
            Toast(this.$t(`message.` + res.message));
          }else{
            this.isEdit=true;
            this.data.imgname='qianzhui'
            this.data.delimg=res.data.logo;
            this.data.imgbase=res.data.logo;
            this.imgSrc=res.data.logo_prefix+res.data.logo;
            this.data.name=res.data.name;
            this.data.nickname=res.data.nickname;
            this.trade_cn=res.data.com_trade.c_name;
            this.data.trade_id=res.data.trade_id;
            this.scale_cn=res.data.com_scale.c_name;
            this.data.scale_id=res.data.scale_id;
            this.nature_cn=res.data.com_nature.c_name;
            this.data.nature_id=res.data.nature_id;
            let a=new Date(res.data.start_time * 1000);
            let aY=a.getFullYear() + '年';
            let aM=(a.getMonth()+1 < 10 ? '0'+(a.getMonth()+1) : a.getMonth()+1) + '月';
            this.startDate=aY + aM;
            this.data.start_time=res.data.start_time;
            this.data.phone=res.data.phone;
            this.data.email=res.data.email;
            this.data.address=res.data.address;
            this.data.introduce=res.data.introduce;

            this.data.tag=res.data.tag;
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
          }
        })
      },
      //上传照片
      onRead(file) {
        this.imgSrc=file.content;
        this.data.imgbase=file.content;
        //console.log(this.data.imgbase);

        // uploadImg(_this.pic).then(res=>{
        //   // //console.log(res);
        //   _this.imgSrc=res[0]+res[1];
        //   this.data.logo=res[1];
        //   //console.log(_this.imgSrc);
        // });
      },
      //选择行业
      selectTrade(ele){
        for(let i=0;i<this.trade.length;i++){
          if(this.trade[i].c_name==ele.target.value){
            this.data.trade_id=this.trade[i].c_id;
          }
        }
        //console.log(this.data.trade_id);
      },
      //选择规模
      selectScale(ele){
        for(let i=0;i<this.scale.length;i++){
          if(this.scale[i].c_name==ele.target.value){
            this.data.scale_id=this.scale[i].c_id;
          }
        }
        //console.log(this.data.scale_id);
      },
      //选择性质
      selectNature(ele){
        for(let i=0;i<this.nature.length;i++){
          if(this.nature[i].c_name==ele.target.value){
            this.data.nature_id=this.nature[i].c_id;
          }
        }
        //console.log(this.data.nature_id);
      },
      start(){
        this.showStart=true;
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
      cancel(){
        this.showStart=false;
      },
      //添加tag
      chooiceTag(item){
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
      //保存企业信息
      saveInfo(){
        this.data.tag=this.data.tag.toString();
        //console.log(this.data);
        let logoStr=this.data.imgbase;
        let nameStr=this.data.name;
        let nickStr=this.data.nickname;
        let tradeNum=this.data.trade_id;
        let scaleNum=this.data.scale_id;
        let natureNum=this.data.nature_id;
        let startNum=this.data.start_time;
        let phoneStr=this.data.phone;
        let emailStr=this.data.email;
        let addressStr=this.data.address;
        let introduceStr=this.data.introduce;

        let nameReg=/^[\u4E00-\u9FA5]{2,15}$/ ;
        let phoneReg=/^1[345678][0-9]{9}$/;
        let emailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if(logoStr == ''){
          Toast('请上传公司logo')
        }else if(nameStr == ''){
          Toast('公司名称不能为空')
        }else if(!nameReg.test(nameStr)){
          Toast('公司全称2-15个汉字')
        }else if(nickStr == ''){
          Toast('公司简称不能为空')
        }else if(tradeNum == ''){
          Toast('请选择行业')
        }else if(scaleNum == ''){
          Toast('请选择规模')
        }else if(natureNum == ''){
          Toast('请选择性质')
        }else if(startNum == ''){
          Toast('请选择成立时间')
        }else if(!phoneReg.test(phoneStr)){
          Toast('请输入有效手机号码')
        }else if(!emailReg.test(emailStr)){
          Toast('请输入有效邮箱地址')
        }else if(addressStr == ''){
          Toast('请输入公司地址')
        }else if(introduceStr == ''){
          Toast('请输入公司简介')
        }else {
          var newData={
            name:this.data.name,
            nickname:this.data.nickname,
            trade_id:this.data.trade_id,
            scale_id:this.data.scale_id,
            nature_id:this.data.nature_id,
            imgbase:this.data.imgbase,
            imgname:'qianzhui',
            phone:this.data.phone,
            email:this.data.email,
            address:this.data.address,
            start_time:this.data.start_time,
            introduce:this.data.introduce,
            tag:this.data.tag,
          }

          postAddCompany(newData).then(res => {
            //console.log(res);
            if (res.data == '') {
              Toast(this.$t(`message.` + res.message));
              setTimeout(() => {
                this.$router.push({path: '/coMe'});
              }, 1000);
            }
          })
        }
      },
      //修改企业信息
      editInfo(){
        this.data.tag=this.data.tag.toString();
        //console.log(this.data);
        let logoStr=this.data.imgbase;
        let nameStr=this.data.name;
        let nickStr=this.data.nickname;
        let tradeNum=this.data.trade_id;
        let scaleNum=this.data.scale_id;
        let natureNum=this.data.nature_id;
        let startNum=this.data.start_time;
        let phoneStr=this.data.phone;
        let emailStr=this.data.email;
        let addressStr=this.data.address;
        let introduceStr=this.data.introduce;

        let nameReg=/^[\u4E00-\u9FA5]{2,15}$/ ;
        let phoneReg=/^1[345678][0-9]{9}$/;
        let emailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if(logoStr == ''){
          Toast('请上传公司logo')
        }else if(nameStr == ''){
          Toast('公司名称不能为空')
        }else if(!nameReg.test(nameStr)){
          Toast('公司全称2-15个汉字')
        }else if(nickStr == ''){
          Toast('公司简称不能为空')
        }else if(tradeNum == ''){
          Toast('请选择行业')
        }else if(scaleNum == ''){
          Toast('请选择规模')
        }else if(natureNum == ''){
          Toast('请选择性质')
        }else if(startNum == ''){
          Toast('请选择成立时间')
        }else if(!phoneReg.test(phoneStr)){
          Toast('请输入有效手机号码')
        }else if(!emailReg.test(emailStr)){
          Toast('请输入有效邮箱地址')
        }else if(addressStr == ''){
          Toast('请输入公司地址')
        }else if(introduceStr == ''){
          Toast('请输入公司简介')
        }else{
          postEditCompany(this.data).then(res=>{
            //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.push({path:'/coMe'});
              }, 1000);
            }
          })
        }


      }
    }
  }
</script>

<style scoped>
  .inner-box {padding: 0 .2rem;background-color:#fff;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .inner-box .p-line{border-top:1px solid #f2f2f2;vertical-align:middle;height: .4rem;line-height: .4rem;padding-top:.1rem;}
  .inner-box .right-van{text-align: right;height:.25rem;overflow: hidden;}
  .inner-box input{text-align: right;border: none;color: #777;}
  .inner-box .for-select{text-align: right;color: #777;height:100%;width:100%;display: block}
  .inner-box select{right: 0;z-index: 1;opacity: .01;position: relative;top: -.25rem;height:100%;width:100%;}
  .resume-more img{height:.15rem;width:.15rem;margin-bottom:.1rem;}
  .resume-img{height:.25rem;width:.25rem;position: absolute;margin-top:0;margin-left:-.55rem;}
  .van-picker{font-size: .14rem;}
  .van-uploader{text-align: right;width:100%;height:.25rem;z-index:99;}
  .van-icon {width: .3rem;font-size: .18rem;position:relative;top: -.07rem;right: 0;bottom: 0;}
  .van-icon-photograph{opacity: 0;}
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top:.5rem;position: fixed;bottom:0;}

  .exp-title{font-size: .14rem;text-align: left;padding:.05rem .2rem;color:#888;}
  .exp-box{width:100%;height:2rem;padding:.1rem .2rem;background-color: #fff;font-size: .14rem;}
  .exp-box textarea{width:100%;height:100%;border:none;overflow-x:hidden;resize:none;color:#888;}

  .van-popup{background-color: unset;}
  .van-loading{height:60px;width:60px;overflow: hidden;}
  .van-modal{background-color: rgba(0,0,0,.3);z-index: 1;}

  .tags {height: auto;width: 100%;margin-top: .065rem;}
  .line {font-size: .14rem;text-align: left;padding: .05rem .2rem;color: #888;}
  .chooice-box .normal.select {color: #fff;background-color: #FD8000;}
  .chooice-box{margin-bottom:1rem;}
  .chooice-box {position: absolute;background-color: #fff;padding: .2rem .2rem 0 .2rem;}
  .chooice-box .normal {font-size: .14rem;display: inline-block;height: .3rem;line-height: .3rem;width: auto;padding: 0 .1rem;border: 1px solid #FD8000;margin-bottom: .2rem;margin-right: .35rem;float: left;color: #FD8000;}
</style>
