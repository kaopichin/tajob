<template>
  <div id="app">
    <div class="content">
      <van-nav-bar
        :title=title
        :left-text=left
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        :fixed=fix
      >
        <van-icon name="delete"  slot="right" />
      </van-nav-bar>
      <div class="company-content inner-box">

        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.positionName')}}</p></van-col>
          <van-col span="14"><p class="right-van"><input type="text" placeholder="请输入"  v-model="data.name"></p></van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.positionNature')}}</p></van-col>
          <van-col span="14"><p class="right-van">
            <span class="for-select" v-text="nature_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="edus" v-model="nature_cn" @change="selectNature" name="dis">
              <option v-for="item in nature" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="10"><p>{{$t('coMe.positionCategories')}}</p></van-col>
          <van-col span="12"><p class="right-van">
            <span class="for-select" v-text="selectcategory_cn" @click="categoryShow=true">{{$t('me.pleaseChoose')}}</span>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="12"><p>{{$t('coMe.academicRequirements')}}</p></van-col>
          <van-col span="10"><p class="right-van">
            <span class="for-select" v-text="edu_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="exprs" v-model="edu_cn" @change="selectEdu" name="dis">
              <option v-for="item in edu" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.workExperience')}}</p></van-col>
          <van-col span="14"><p class="right-van">
            <span class="for-select" v-text="exper_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="years" v-model="exper_cn" @change="selectExper" name="dis">
              <option v-for="item in exper" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="8"><p>{{$t('coMe.ageRequirement')}}</p></van-col>
          <van-col span="14"><p class="right-van">
            <span class="for-select" v-text="age_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="currents" v-model="age_cn" @change="selectAge" name="dis">
              <option v-for="item in age" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.salary')}}</p></van-col>
          <van-col span="14" offset="2"><p class="right-van">
            <span class="for-select" v-text="salary_cn">{{$t('me.pleaseChoose')}}</span>
            <select id="salary" v-model="salary_cn" @change="selectSalary" name="dis">
              <option v-for="item in salary" :value="item.c_name">{{item.c_name}}</option>
            </select>
          </p></van-col>
          <van-col span="2" class="resume-more">
            <img src="../../../static/images/right.png" alt="">
          </van-col>
        </van-row>

        <van-row class="p-line">
          <van-col span="6"><p>{{$t('coMe.workPlace')}}</p></van-col>
          <van-col span="14" offset="2">
            <p class="right-van">
              <input type="text" placeholder="请输入工作地点" v-model="data.address">
            </p>
          </van-col>
        </van-row>

      </div>

      <p class="exp-title">{{$t('coMe.descriptionPosition')}}  ({{$t('common.required')}})</p>
      <div class="exp-box">
        <textarea rows="6" placeholder="请输入该职位的具体工作内容" v-model="data.duty">
        </textarea>
      </div>

      <p class="exp-title">{{$t('coMe.requirementsPosition')}}  ({{$t('common.optional')}})</p>
      <div class="exp-box">
        <textarea rows="6" placeholder="请输入该职位的工作要求" v-model="data.experience">
        </textarea>
      </div>

      <div class="tags">
        <p class="line">{{$t('coMe.showJobTags')}}</p>
        <div class="chooice-box">
          <span class="normal" v-for="(item,index) in tags" @click="chooiceTag(item)" :class="{select:item.select}">{{item.c_name}}</span>
        </div>
      </div>

      <div class="save" @click="edit">
        {{$t('common.modify')}}
      </div>

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
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  import Vue from 'vue';
  import {getJobEdit,getJobsAdd,getJobNature,getEducation,getAge,getExperience,getWage,geTag,postJobsAdd,getJob,postJobsEdit,getJobsDel} from '@/server/getData';

  export default {
    name: "editPost",
    data() {
      return {
        title: this.$t('common.editPosition'),
        left: this.$t('common.back'),
        fix: true,
        data:{
          name:'',//(名称string)
          nature_id:'',//(性质ID)
          job_id:'',//(职位类别)
          education_id:'',//(学历ID)
          year_id:'',//(年限ID)
          age_id:'',//(年龄ID)
          salary_id:'',//(薪资ID)
          address:'',//(地区string)
          duty:'',//(职位描述)
          experience:'',//(工作要求)非必须
          tag:[],//(福利标签,ID组成的string)非必须
          id:''
        },
        nature:[],
        nature_cn:'',
        edu:[],
        edu_cn:'',
        age:[],
        age_cn:'',
        exper:[],
        exper_cn:'',
        salary:[],
        salary_cn:'',
        tags:[],
        tag_cn:'',

        categoryShow:false,
        selectcategoryl:'',
        selectcategorycn:'',
        category:[],
        categorychecked:-1,
        selectcategory_cns:[],
        selectcategory:[],
        selectcategory_cn:this.$t('me.pleaseChoose'),
      }
    },
    created() {

    },
    mounted() {
      let pos_id = this.$route.query.id;
      //获取全部标签
      this.getTag();
      //获取已新增内容
      this.toEdit(pos_id);
      //获取职位性质
      getJobNature().then(res=>{
        this.nature=res.data;
      });
      //获取学历
      getEducation().then(res=>{
        this.edu=res.data;
      });
      //获取年龄
      getAge().then(res=>{
        // //console.log(res);
        this.age=res.data;
      });
      //获取工作经验
      getExperience().then(res=>{
        // //console.log(res);
        this.exper=res.data;
      });
      //获取薪资
      getWage().then(res=>{
        // //console.log(res);
        this.salary=res.data;
      });

      //获取职位
      getJob({id:0}).then(res=>{
        // this.category=res.data;
        // //console.log(res);
      });
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      //删除职位
      onClickRight(){
        Dialog.confirm({
          title: '删除职位',
          message: '是否删除该职位？'
        }).then(() => {
          // on confirm
          getJobsDel({id:this.$route.query.id}).then(res=>{
            // //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=> {
                this.$router.push({path:'/coManage'});
              },1000)
            }
          })
        }).catch(() => {
          // on cancel
        });
      },
      getTag(){
        geTag().then(res=>{
          // //console.log(res);
          this.tags=res.data;
          return this.tags;
        });
      },
      //修改前的get
      toEdit(e){
        getJobEdit({id:e}).then(res=>{
          // //console.log(res);
          if(res.data !== ''){
            this.data.id=e;
            this.data.name=res.data.name;
            this.data.nature_id=res.data.position_nature.c_id;
            this.nature_cn=res.data.position_nature.c_name;
            this.data.job_id=res.data.job_id;
            this.selectcategory_cn=res.data.jobs_category.categoryname;
            this.data.education_id=res.data.education_id;
            this.edu_cn=res.data.position_education.c_name;
            this.data.year_id=res.data.position_year.c_id;
            this.exper_cn=res.data.position_year.c_name;
            this.data.age_id=res.data.position_age.c_id;
            this.age_cn=res.data.position_age.c_name;
            this.data.salary_id=res.data.position_salary.c_id;
            this.salary_cn=res.data.position_salary.c_name;
            this.data.address=res.data.address;
            this.data.duty=res.data.duty;
            this.data.experience=res.data.experience;
            this.data.tag=res.data.tag;
            // //console.log(this.data.tag);
            // //console.log(this.tags);
            for (var i = 0; i < this.data.tag.length; i++) {
              for (var j = 0; j < this.tags.length; j++) {
                if (this.data.tag[i] == this.tags[j].c_id) {
                  // //console.log(11111111111111);
                  Vue.set(this.tags[j], 'select', true)
                }
              }
            }
          }
        })
      },
      //选择职业性质
      selectNature(ele){
        for(let i=0;i<this.nature.length;i++){
          if(this.nature[i].c_name==ele.target.value){
            this.data.nature_id=this.nature[i].c_id;
          }
        }
        // //console.log(this.data.nature_id);
      },
      //选择学历
      selectEdu(ele){
        for(let i=0;i<this.edu.length;i++){
          if(this.edu[i].c_name==ele.target.value){
            this.data.education_id=this.edu[i].c_id;
          }
        }
        // //console.log(this.data.education_id);
      },
      //选择年龄
      selectAge(ele){
        for(let i=0;i<this.age.length;i++){
          if(this.age[i].c_name==ele.target.value){
            this.data.age_id=this.age[i].c_id;
          }
        }
        // //console.log(this.data.age_id);
      },
      //选择工作经验
      selectExper(ele){
        for(let i=0;i<this.exper.length;i++){
          if(this.exper[i].c_name==ele.target.value){
            this.data.year_id=this.exper[i].c_id;
          }
        }
        // ////console.log(this.data.year_id);
      },
      //选择薪资
      selectSalary(ele){
        for(let i=0;i<this.salary.length;i++){
          if(this.salary[i].c_name==ele.target.value){
            this.data.salary_id=this.salary[i].c_id;
          }
        }
        //console.log(this.data.salary_id);
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
      //修改职位
      edit(){
        this.data.tag=this.data.tag.toString();
        //console.log(this.data);
        let nameStr=this.data.name;
        let natureStr=this.data.nature_id;
        let jobStr=this.data.job_id;
        let educationStr=this.data.education_id;
        let yearStr=this.data.year_id;
        let ageStr=this.data.age_id;
        let salaryStr=this.data.salary_id;
        let addressStr=this.data.address;
        let dutyStr=this.data.duty;
        let tagStr=this.data.tag;

        let nameReg=/^[\u4E00-\u9FA5]{2,15}$/




        if(nameStr == ''){
          Toast('职位名称不能为空')
        }else if(!nameReg.test(nameStr)){
          Toast('职位名称2-15个汉字')
        }else if(natureStr == ''){
          Toast('请选择职位性质')
        }else if(jobStr == ''){
          Toast('请选择职位类别')
        }else if(educationStr == ''){
          Toast('请选择学历要求')
        }else if(yearStr == ''){
          Toast('请选择工作经验')
        }else if(ageStr == ''){
          Toast('请选择年龄要求')
        }else if(salaryStr == ''){
          Toast('请选择薪资')
        }else if(addressStr == ''){
          Toast('请输入工作地点')
        }else if(dutyStr == ''){
          Toast('请填写职位描述')
        }else if(tagStr == ''){
          Toast('请选择职位福利')
        }else{
          postJobsEdit(this.data).then(res=>{
            //console.log(res);
            if(res.data == ''){
              Toast(this.$t(`message.` + res.message));
              setTimeout(()=>{
                this.$router.push({path:'/coManage'});
              },1000);
            }
          });
        }
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
        this.data.job_id=this.selectcategory.pop();
        //console.log(this.data.job_id);
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
    }
  }
</script>

<style scoped>
  #app{height:1100px;}
  .inner-box {padding: 0 .2rem;background-color:#fff;}
  .inner-box p{text-align: left;font-size: 14px;line-height: .25rem;overflow: hidden;}
  .inner-box .p-line{border-top:1px solid #f2f2f2;vertical-align:middle;height: .4rem;line-height: .4rem;padding-top:.1rem;}
  .inner-box .right-van{text-align: right;height:.25rem;overflow: hidden;}
  .inner-box input{text-align: right;border: none;color: #777;}
  .inner-box .for-select{text-align: right;color: #777;height:100%;width:100%;display: block}
  .inner-box select{right: 0;z-index: 1;opacity: .01;position: relative;top: -.25rem;height:100%;width:100%;}
  .resume-more img{height:.15rem;width:.15rem;margin-bottom:.1rem;}
  .resume-img{height:.25rem;width:.25rem;position: absolute;margin-top:-.3rem;margin-left:-.55rem;}
  .van-picker{font-size: .14rem;}
  .van-uploader{text-align: right;width:100%;height:.25rem;z-index:99;}
  .van-icon {width: .3rem;font-size: .18rem;position:relative;top: -.07rem;right: 0;bottom: 0;}
  .van-icon-photograph{opacity: 0;}
  .save{width:100%;height: .5rem;line-height: .5rem;font-size: .16rem;color:#fff;background-color: #0180CF;margin-top:.5rem;position: fixed;bottom:0;}

  .exp-title{font-size: .14rem;text-align: left;padding:.05rem .2rem;color:#888;}
  .exp-box{width:100%;height:1rem;padding:.1rem .2rem;background-color: #fff;font-size: .14rem;}
  .exp-box textarea{width:100%;height:100%;border:none;overflow-x:hidden;resize:none;color:#888;}

  .tags {height: auto;width: 100%;margin-top: .065rem;}
  .line {font-size: .14rem;text-align: left;padding: .05rem .2rem;color: #888;}
  .chooice-box .normal.select {color: #fff;background-color: #FD8000;}
  .chooice-box {position: absolute;background-color: #fff;padding: .2rem .2rem 0 .2rem;}
  .chooice-box .normal {font-size: .14rem;display: inline-block;height: .3rem;line-height: .3rem;width: auto;padding: 0 .1rem;border: 1px solid #FD8000;margin-bottom: .2rem;margin-right: .35rem;float: left;color: #FD8000;}

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
