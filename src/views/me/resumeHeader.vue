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
          <van-col span="10"><p>{{$t('me.resumePhoto')}}</p></van-col>
          <van-col span="12" offset="2"><p class="right-van">
            <van-uploader :after-read="onRead" :max-size=maxsize>
              <van-icon name="photograph" />
            </van-uploader>
            <img :src=imgSrc alt="" class="resume-img" v-if="imgSrc !== ''">
            <img src="../../../static/images/person.png" alt="" class="resume-img" v-else>
          </p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="4"><p>{{$t('me.name')}}</p></van-col>
          <van-col span="16" offset="2"><p class="right-van"><input type="text" placeholder="请输入" v-model="data.name" onkeyup="this.value=this.value.replace(/\s+/g,'')"></p></van-col>
        </van-row>

        <div @click="selectSex">
          <van-row class="p-line">
            <van-col span="4"><p>{{$t('me.gender')}}</p></van-col>
            <van-col span="16" offset="2"><p class="right-van">
              <input type="text" :placeholder="$t('me.male')" readonly v-model="sex">
            </p></van-col>
            <van-col span="2" class="resume-more">
              <img src="../../../static/images/right.png" alt="">
            </van-col>
          </van-row>
        </div>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('me.yearBirth')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">
            <span class="for-select" v-text="birth_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="birthdate" v-model="birth_cn" @change="selectYear" name="birthdate" >
              <option v-for="item in year" :value="item">{{item}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('me.highestEducation')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="edu_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="edus" v-model="edu_cn" @change="selectEdu" name="dis">
              <option v-for="item in edu" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('coMe.workExperience')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="experience_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="exprs" v-model="experience_cn" @change="selectExperience" name="dis">
              <option v-for="item in experience" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('me.living')}}</p></van-col>
          <van-col span="14" offset="2">
            <p class="right-van">
              <input type="text" placeholder="请输入居住地" v-model="data.address" onkeyup="this.value=this.value.replace(/\s+/g,'')">
            </p>
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.email')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van"><input type="text" placeholder="请输入邮箱" v-model="data.email" onkeyup="this.value=this.value.replace(/\s+/g,'')"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('me.workingStatus')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="current_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="currents" v-model="current_cn" @change="selectCurrent" name="dis">
              <option v-for="item in current" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('me.natureWork')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="nature_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="nature" v-model="nature_cn" @change="selectNature" name="dis">
              <option v-for="item in nature" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('company.expectIndustry')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="trade_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="trade" v-model="trade_cn" @change="selectTrade" name="dis">
              <option v-for="item in trade" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('me.expectPosition')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="selectcategory_cn" @click="categoryShow=true">{{$t('me.pleaseChoose')}}</span>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('me.expectedArea')}}</p></van-col>
          <van-col span="10" offset="2"><p class="right-van">
            <span class="for-select" v-text="selectArea_cn" @click="areaShow=true">{{$t('me.pleaseChoose')}}</span>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('company.expectSalary')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">
            <span class="for-select" v-text="wage_cn"></span>
            <select id="wage" v-model="wage_cn" @change="selectWage" name="wage">
              <option v-for="item in wage" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

      </div>

      <div class="save" @click="saveInfo" v-show="isEdit == false">
        {{$t('common.save')}}
      </div>

      <div class="save" @click="editInfo" v-show="isEdit == true">
        {{$t('common.modify')}}
      </div>

      <van-actionsheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        cancel-text="取消"
      />

      <!--职位弹出层-->
      <van-popup class="popupStyle" v-model="categoryShow" position="bottom" :overlay="true" >
        <div class="f-box f-box-city" style="height: 400px;">
          <van-row class="popbar">
            <van-col class="text-left" span="12">
              <span class="span1" @click="removecategory">{{$t('common.cancel')}}</span>
              <span class="span2"></span>
            </van-col>
            <van-col class="text-right" span="12">
              <span class="span1" @click="yescategory">{{$t('common.yes')}}</span>
            </van-col>
          </van-row>
          <div class="f-box-inner" >
            <div class="ncf-list-g for-type cusType" v-show="selectcategoryl!=0"  style="display: block; transform-origin: 0; opacity: 1; transform: scale(1, 1);">
              <div class="ncf-list-c Js-ncf-list-c">{{$t('common.curSelect')}}：
                <span class="cuPo"  v-html="selectcategorycn"></span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="ncc-list-g">
              <div class="ncc-list-c Js-ncc-list-c">
                <div class="camFlag c normalC" :class="{chk:categorychecked == item.id}" v-for="(item,index) in category" @click="categorygetNext(item,index)">
                  <div class="c-icb">
                    <div class="c-ic"></div>
                  </div>
                  <div class="c-txb" v-text="item.categoryname"></div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>


      <!--地区弹出层-->
      <van-popup class="popupStyle" v-model="areaShow" position="bottom" :overlay="true" >
        <div class="f-box f-box-city" style="height: 400px;">
          <van-row class="popbar">
            <van-col class="text-left" span="12">
              <span class="span1" @click="removeArea">{{$t('common.cancel')}}</span>
              <span class="span2"></span>
            </van-col>
            <van-col class="text-right" span="12">
              <span class="span1" @click="yesArea">{{$t('common.yes')}}</span>
            </van-col>
          </van-row>
          <div class="f-box-inner" >
            <div class="ncf-list-g for-type cusType" v-show="selectcategoryl!=0"  style="display: block; transform-origin: 0; opacity: 1; transform: scale(1, 1);">
              <div class="ncf-list-c Js-ncf-list-c">{{$t('common.curSelect')}}：
                <span class="cuPo"  v-html="selectcategorycn"></span>
              </div>
              <div class="clear"></div>
            </div>
            <div class="ncc-list-g">
              <div class="ncc-list-c Js-ncc-list-c">
                <div class="camFlag c normalC" :class="{chk:areachecked == item.id}" v-for="(item,index) in district" @click="categoryAreaNext(item,index)">
                  <div class="c-icb">
                    <div class="c-ic"></div>
                  </div>
                  <div class="c-txb" v-text="item.categoryname"></div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-popup>

    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import {getAddResume,postAddResume,getEditResume,postEditResume,getWage,getDistrict,getJobNature,getTrade,getCurrent,getExperience,getJob,getEducation,uploadImg,addCredent,delImg,isPerfect} from '@/server/getData';

  export default {
    name: "resumeHeader",
    data() {
      return {
        title: this.$t('common.basicInfo'),
        left: this.$t('common.back'),
        fix: true,
        pic:{
          name:'',
          img:''
        },
        imgSrc:'',
        show: false,
        showTimer:false,
        actions: [
          {
            name: '男',
            id:'1'
          },
          {
            name: '女',
            id:'2'
          },
        ],
        email:'',
        data:{
          imgbase:'',//图片的base64
          imgname:'',//图片name
          delimg:'',//上一张图片路径
          name:'',//神
          sex:'1',//1
          born_year:'',//2002
          h_education_id:'',
          experience_id:'',//79
          address:'',//
          email:'',//1455623@qq.com
          job_state_id:'',//241
          job_nature_id:'',//62
          industry_id:'',//2
          position_id:'',//3.23.178
          province_id:'',
          city_id:'',
          area_id:'',
          salary_id:'',//61
          // id:0,
        },
        wage_cn:this.$t('me.pleaseChoose'),
        dis_cn:this.$t('me.pleaseChoose'),
        trade_cn:this.$t('me.pleaseChoose'),
        nature_cn:this.$t('me.pleaseChoose'),
        current_cn:this.$t('me.pleaseChoose'),
        experience_cn:this.$t('me.pleaseChoose'),
        birth_cn:this.$t('me.pleaseChoose'),
        edu_cn:this.$t('me.pleaseChoose'),
        sex_cn:this.$t('me.pleaseChoose'),
        wage:[],
        trade:[],
        nature:[],
        current:[],
        experience:[],
        edu:[],
        year:[this.$t('me.pleaseChoose')],
        sex:[],
        district:[],
        categoryShow:false,
        selectcategoryl:'',
        selectcategorycn:'',
        category:[],
        categorychecked:-1,
        selectcategory_cns:[],
        selectcategory:[],
        selectcategory_cn:this.$t('me.pleaseChoose'),
        caParentid:[],
        areaShow:false,
        areachecked:-1,
        selectArea_cn:this.$t('me.pleaseChoose'),
        selectArea:[],
        isEdit:false,
        maxsize:1048576,//1 MB = 1048576 b
      }
    },
    mounted(){
      var _this=this;
      for(var i=1949;i<2020;i++){
        _this.year.push(i)
      }
      //获取新增简历已有基本信息
      // getAddResume().then(res=>{
      //   //console.log(res);
      // }),
      //获取已新增简历
      this.getResume();
      // 获取薪资
      getWage().then(res=>{
        this.wage=res.data;
        // //console.log(this.data.wage);
      });
      // 获取地区
      getDistrict({id:0}).then(res=>{
        this.district=res.data;
        // //console.log(this.district);
      });
      // 获取工作性质
      getJobNature().then(res=>{
        this.nature=res.data;
        // //console.log(this.nature);
      });
      //获取行业
      getTrade().then(res=>{
        this.trade=res.data;
        // //console.log(this.trade);
      });
      //获取学当前状态
      getCurrent().then(res=>{
        this.current=res.data;
        // //console.log(this.data.current);
      });
      //获取工作经历
      getExperience().then(res=>{
        this.experience=res.data;
        // //console.log(this.data.experience);
      });
      //获取职位
      getJob({id:0}).then(res=>{
        this.category=res.data;
        // //console.log(res);
      });
      //获取学历
      getEducation().then(res=>{
        this.edu=res.data;
        // //console.log(this.data.edu);
      })
    },
    methods: {
      onClickLeft() {
        //判断用户信息是否完整
        isPerfect().then(res => {
          console.log(res);
          if (res.message == 1.2) {
            //普通用户未完善
            this.$router.push({path: '/backPage'})
          }else if(res.message == 1.1){
            this.$router.go(-1);
          }

        })
      },
      selectSex(){
        this.show=true
      },
      getResume(){
        getEditResume().then(res=>{
          //console.log(res);
          if(res.data.length !== 0){
            this.isEdit=true;
            this.data.name=res.data.name;
            this.data.sex=res.data.sex;
            if(res.data.sex == '1'){
              this.sex='男'
            }else if(res.data.sex == '2'){
              this.sex='女'
            }
            if(res.data.log){
              this.data.delimg=res.data.log;
              this.imgSrc=res.data.log_prefix+res.data.log;
              this.data.imgbase=res.data.log;
              this.data.imgname='touxiang';
            }else{
            }
            //console.log(this.imgSrc);
            this.data.born_year=res.data.born_year;
            this.birth_cn=res.data.born_year;
            this.data.h_education_id=res.data.h_education_id;
            this.edu_cn=res.data.resume_education.c_name;
            this.data.experience_id=res.data.experience_id;
            this.experience_cn=res.data.resume_experience.c_name;
            this.data.address=res.data.address;
            this.data.email=res.data.email;
            this.data.job_state_id=res.data.job_state_id;
            this.current_cn=res.data.resume_job_state.c_name;
            this.data.job_nature_id=res.data.job_nature_id;
            this.nature_cn=res.data.resume_job_nature.c_name;
            this.data.industry_id=res.data.industry_id;
            this.trade_cn=res.data.resume_industry.c_name;
            this.data.position_id=res.data.position_id;
            this.selectcategory_cn=res.data.resume_position.categoryname;
            this.data.province_id=res.data.province_id;
            this.data.city_id=res.data.city_id;
            this.data.area_id=res.data.area_id;
            this.selectArea_cn=res.data.area.categoryname;
            this.data.salary_id=res.data.salary_id;
            this.wage_cn=res.data.resume_salary.c_name;
          }
        })
      },
      selectTime(){
        this.showTimer=true
      },
      //上传照片
      onRead(file) {
        this.imgSrc=file.content;
        this.data.imgbase=file.content;
        // this.pic.img=file.content;
        //console.log(this.data.imgbase);

        // uploadImg(this.pic).then(res=>{
        //   this.data.log=res[1];
        //   this.imgSrc=res[0]+res[1];
        //   //console.log(this.data.log,1111111111111111);
        // });
      },
      // 选择性别
      onSelect(item) {
        // 点击选项时默认不会关闭菜单，可以手动关闭
        this.show = false;
        this.sex=item.name;
        this.data.sex=item.id;
      },
      // 选择出生年
      selectYear(ele){
        this.data.born_year=ele.target.value;
        //console.log(this.data.born_year);
      },
      //选择薪资
      selectWage(ele){
        for(let i=0;i<this.wage.length;i++){
          if(this.wage[i].c_name == ele.target.value){
            this.data.salary_id=this.wage[i].c_id;
          }
        }
        //console.log(this.data.salary_id);
      },
      //选择行业
      selectTrade(ele){
        for(let i=0;i<this.trade.length;i++){
          if(this.trade[i].c_name==ele.target.value){
            this.data.industry_id=this.trade[i].c_id;
          }
        }
        //console.log(this.data.industry_id);
      },
      //地区取消按钮
      removeArea(){
        this.selectArea = [];
        this.selectArea_cn=''
        this.areaShow=false
      },
      //地区确定按钮
      yesArea(){
        this.data.province_id=this.selectArea[0];
        this.data.city_id=this.selectArea[1];
        this.data.area_id=this.selectArea[2];
        //console.log(this.data.area_id);
        this.selectArea = [];
        // this.selectArea_cn=''
        this.areaShow=false;
      },
      //地区选择
      categoryAreaNext(item,index){
        //拿到当前id
        this.areachecked=item.id;
        //拿到当前name
        this.selectArea_cn=item.categoryname;
        //建一个id数组
        this.selectArea.push(item.id);
        //console.log("selectArea"+this.selectArea);
        //获取第二、三级职位
        if(this.selectArea.length<=2){
          getDistrict({id:item.id}).then(res=>{
            this.district=res.data;
            //console.log(this.district);
          });
        }
      },
      //选择工作性质
      selectNature(ele){
        for(let i=0;i<this.nature.length;i++){
          if(this.nature[i].c_name==ele.target.value){
            this.data.job_nature_id=this.nature[i].c_id;
          }
        }
        //console.log(this.data.job_nature_id);
      },
      //选择工作状态
      selectCurrent(ele) {
        for (let i = 0; i < this.current.length; i++) {
          if (this.current[i].c_name == ele.target.value) {
            this.data.job_state_id = this.current[i].c_id;
          }
        }
        //console.log(this.data.job_state_id);
      },
      //选择工作经验
      selectExperience(ele) {
        for (let i = 0; i < this.experience.length; i++) {
          if (this.experience[i].c_name == ele.target.value) {
            this.data.experience_id = this.experience[i].c_id;
          }
        }
        //console.log(this.data.experience_id);
      },
      //选择学历
      selectEdu(ele) {
        for (let i = 0; i < this.edu.length; i++) {
          if (this.edu[i].c_name == ele.target.value) {
            this.data.h_education_id = this.edu[i].c_id;
          }
        }
        //console.log(this.data.h_education_id);
      },
      //职位取消按钮
      removecategory(){
        this.selectcategory = [];
        this.selectcategory_cns=[];
        this.selectcategorycn='';
        this.selectcategoryl=0;
        this.categoryShow=false;
      },
      //职位确定按钮
      yescategory(){
        //上传职位id
        this.data.position_id=this.selectcategory.pop();
        //console.log(this.data.position_id);
        this.selectcategory = [];
        this.selectcategory_cns=[];
        this.selectcategorycn='';
        this.selectcategoryl=0;
        this.categoryShow=false;
      },
      //职位选择
      categorygetNext(item,index){
        //拿到当前id
        this.categorychecked=item.id;
        //拿到当前name
        this.selectcategory_cn=item.categoryname;
        //建一个id数组
        this.selectcategory.push(item.id);
        //console.log(this.selectcategory);
        //获取第二、三级职位
        if(this.selectcategory.length<=2){
          getJob({id:item.id}).then(res=>{
            this.category=res.data;
            //console.log(this.category);
          });
        }
      },
      //保存
      saveInfo(){
        //console.log(this.data);
        let logStr=this.data.imgbase;
        let nameStr=this.data.name;
        let sexStr=this.data.sex;
        let bornStr=this.data.born_year;
        let educationStr=this.data.h_education_id;
        let experienceStr=this.data.experience_id;
        let addressStr=this.data.address;
        let emailStr=this.data.email;
        let stateStr=this.data.job_state_id;
        let natureStr=this.data.job_nature_id;
        let industryStr=this.data.industry_id;
        let positionStr=this.data.position_id;
        let provinceStr=this.data.province_id;
        let cityStr=this.data.city_id;
        let areaStr=this.data.area_id;
        let salaryStr=this.data.salary_id;
        let nameReg=/^[\u4E00-\u9FA5]{2,5}$/ ;
        let phoneReg=/^1[345678][0-9]{9}$/;
        let emailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if(logStr == ''){
          Toast('请上传简历照片')
        }if(nameStr == ''){
          Toast('姓名不能为空')
        }else if(!nameReg.test(nameStr)){
          //console.log(nameStr);
          Toast('姓名需为2-5个汉字');
        }else if(sexStr == ''){
          Toast('请选择性别')
        }else if(bornStr == ''){
          Toast('请选择出生年份')
        }else if(educationStr == ''){
          Toast('请选择最高学历')
        }else if(experienceStr == ''){
          Toast('请选择工作经验')
        }else if(addressStr == ''){
          Toast('现居住地不能为空')
        }else if(!emailReg.test(emailStr)){
          Toast('请输入有效邮箱地址')
        }else if(stateStr == ''){
          Toast('请选择工作状态')
        }else if(natureStr == ''){
          Toast('请选择工作性质')
        }else if(industryStr == ''){
          Toast('请选择期望行业')
        }else if(positionStr == ''){
          Toast('请选择期望职业')
        }else if(areaStr == ''){
          Toast('请选择期望地区')
        }else if(salaryStr == ''){
          Toast('请选择期望薪资')
        }else{
          var obj={
            imgbase:this.data.imgbase,
            imgname:'qianzhui',
            name:this.data.name,
            sex:this.data.sex,
            born_year:this.data.born_year,
            h_education_id:this.data.h_education_id,
            experience_id:this.data.experience_id,
            address:this.data.address,
            email:this.data.email,
            job_state_id:this.data.job_state_id,
            job_nature_id:this.data.job_nature_id,
            industry_id:this.data.industry_id,
            position_id:this.data.position_id,
            province_id:this.data.province_id,
            city_id:this.data.city_id,
            area_id:this.data.area_id,
            salary_id:this.data.salary_id,
          };
          postAddResume(obj).then(res=>{
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
      //修改
      editInfo(){
        //console.log(this.data);
        let logStr=this.data.imgbase;
        let nameStr=this.data.name;
        let sexStr=this.data.sex;
        let bornStr=this.data.born_year;
        let educationStr=this.data.h_education_id;
        let experienceStr=this.data.experience_id;
        let addressStr=this.data.address;
        let emailStr=this.data.email;
        let stateStr=this.data.job_state_id;
        let natureStr=this.data.job_nature_id;
        let industryStr=this.data.industry_id;
        let positionStr=this.data.position_id;
        let provinceStr=this.data.province_id;
        let cityStr=this.data.city_id;
        let areaStr=this.data.area_id;
        let salaryStr=this.data.salary_id;

        let nameReg=/^[\u4E00-\u9FA5]{2,5}$/ ;
        let emailReg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        //console.log(logStr);
        if(logStr == ''){
          Toast('请上传简历照片')
        }else if(nameStr == ''){
          Toast('姓名不能为空')
        }else if(!nameReg.test(nameStr)){
          //console.log(nameStr);
          Toast('姓名需为2-5个汉字')
        }else if(sexStr == ''){
          Toast('请选择性别')
        }else if(bornStr == ''){
          Toast('请选择出生年份')
        }else if(educationStr == ''){
          Toast('请选择最高学历')
        }else if(experienceStr == ''){
          Toast('请选择工作经验')
        }else if(addressStr == ''){
          Toast('现居住地不能为空')
        }else if(!emailReg.test(emailStr)){
          Toast('请输入有效邮箱地址')
        }else if(stateStr == ''){
          Toast('请选择工作状态')
        }else if(natureStr == ''){
          Toast('请选择工作性质')
        }else if(industryStr == ''){
          Toast('请选择期望行业')
        }else if(positionStr == ''){
          Toast('请选择期望职业')
        }else if(areaStr == ''){
          Toast('请选择期望地区')
        }else if(salaryStr == ''){
          Toast('请选择期望薪资')
        }else{
          postEditResume(this.data).then(res=>{
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
  #app{background-color: #f2f2f2;}
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
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top: .5rem;position: fixed;bottom:0;}

  .popupStyle .van-row{padding: 0 0.3rem;margin-bottom:.1rem;}
  .popupStyle .van-row .van-col span{font-size: 0.1rem;}
  .popupStyle .van-row .van-col .span1{padding:0.05rem 0.1rem;border:1px solid #ccc;border-radius: 4px;}
  .popupStyle .van-row .van-col .span2{color: #1496F1;padding-left: 1rem;}
  .popupStyle .van-row .van-col.text-right{text-align: right;}
  .popupStyle .van-row .van-col.text-right .span1{border-color: #1496F1;color: #1496F1;}
  .popupStyle .van-checkbox{padding: 0.2rem 1rem;border-top: 1px solid #f0f2f5;}
  .ncc-list-g .ncc-list-c {height: .5rem;line-height: .5rem;}
  .ncc-list-c .c {line-height: .5rem;height: .5rem;padding: 0 .234rem 0 .1rem;border-bottom: 1px solid rgba(188,187,187,0.28);color: #666;text-decoration: none;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: .14rem;}
  .ncf-list-g {background-color: #ededed;max-width: 750px;border-bottom: 1px solid #e3e3e3;height: .4rem;line-height: .4rem;font-size: .14rem;text-align: left;padding-left: .3rem;overflow: hidden;}
</style>
