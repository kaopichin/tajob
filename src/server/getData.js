import {BASEURL, fetch, post, patch, put, get} from './http.js'

export const BASICURL = BASEURL;

// export const xx = data => post('', data);
//export const xx = data => get('');

/////////////个人/////////////////////

//基本接口//

//判断是否为第一次登陆（message为0时是第一次登陆,为1时不是）
export const isFirst = data => get('/job/is_first');
//用户选择身份 (post 类型:type:1普通用户 type:2企业用户)
export const addUser = data => post('/job/add_user', data);
//判断用户信息是否完整  get('is_perfect    message=1.1 普通用户已完善，=1.2普通用户未完善，=2.1企业用户已完善，=2.2企业用户未完善
export const isPerfect = data => get('/job/is_perfect');
// DelImg post  img:删除照片的地址
export const delImg = datas => post('/job/DelImg',datas);

//首页//

// 轮播图接口:       get   job/lun_img
export const swiper = data => get('/job/lun_img', data);
//职位列表:	 get
export const index = data => get('/job/index/list', data);
// 职位详情:  get 职位ID
export const showDetail = data => get(`/job/show/${data.id}`);
// 公司详情:comshow/id  get 公司ID
export const showCom = data => get(`/job/comshow/${data.id}`);
//收藏/取消收藏职位   get('favoriters_job/{id}');
export const favoritersJob = data => get(`/job/favoriters_job/${data.id}`);
//关注公司/取消     get('com_follow/{id}
export const comFollow = data => get(`/job/com_follow/${data.id}`);
//投递简历* post('resume_apply'); 职位ID:position_id  公司ID:company_id
export const resumeApply = data => post('/job/resume_apply', data);
// 个人搜索职位: job/search_position   post传参:搜索值:val
export const searchPosition = data => post('/job/search_position', data);

// 我的//

// get('personal/{type}','PersonalController@index');//个人基本信息      参数        企业  2   个人  1
export const personal = data => get(`/job/personal/${data.type}`);
// 学历:   job/get_education  	get
export const getEducation = data => get('/job/get_education');
//图片上传:   job/uploadImg	  post     name:图片所属的名称 img:图片的base64     返回图片地址
export const uploadImg = data => post('/job/uploadImg', data);
//获取薪资选项:  job/get_wage	 get
export const getWage = data => get('/job/get_wage');
// 城市列表:    job/get_district	get
export const getDistrict = data => get(`/job/get_categorydistrict/${data.id}`);
// 职位性质: job/get_job_nature	get
export const getJobNature = data => get('/job/get_job_nature');
// 行业:job/get_trade	get
export const getTrade = data => get('/job/get_trade');
// 目前工作状态:   job/get_current	get
export const getCurrent = data => get('/job/get_current');
// 工作经验:   job/get_experience	get
export const getExperience = data => get('/job/get_experience');
// 职位列表:   job/get_job 	get  一级是pid=0');
export const getJob = data => get(`/job/get_categoryjob/${data.id}`);

// 教育经历列表:    job/education_list    get
export const educationList = data => get('/job/education_list');
// 工作经历列表:    job/work_list    get
export const workList = data => get('/job/work_list');
// 证书列表:     job/credent_list    get
export const credentList = data => get('/job/credent_list');
// 培训经历列表:   job/train_list    get
export const trainList = data => get('/job/train_list');

//新增个人简历   get('add_resume
export const getAddResume = data => get('/job/add_resume');
//新增个人简历   post('add_resume     参数    姓名:name,	性别:sex,	出生年份:born_year,	最高学历ID:h_education_id,	工作经验ID:experience_id,	居住地:address,		邮箱:email,		工作状态job_state_id,		工作性质ID:job_nature_id,	行业ID:industry_id,	职位ID:position_id,	省:province_id 市:city_id 区:area_id,		薪资salary_id
export const postAddResume = obj => post('/job/add_resume', obj);
//获取已新增简历    get('edit_resume
export const getEditResume = data => get('/job/edit_resume');
//修改简历          post('edit_resume
export const postEditResume = data => post('/job/edit_resume', data);
//新增证书: job/add_credent		post证书名称:name,	时间年份:year,	时间月份:month
export const addCredent = data => post('/job/add_credent', data);
//获取已新增证书      get('edit_credent/{credent_id}'
export const getCredent = data => get(`/job/edit_credent/${data.id}`);
//修改证书    post('edit_credent/{credent_id}
export const editCredent = data => post(`/job/edit_credent/${data.id}`, data);
//判断是新增标签还是修改标签     id:简历ID     返回值为0时:有值,修改    为1时:没有值,新增
export const isTag = data => get(`/job/is_tag/${data.id}`);
//获取个人标签    job/get_resumetag	get
export const getResumetag = data => get('/job/get_resumetag');
// 新增个人标签:job/add_tag			postpost参数:tag (字符串)
export const postUserTag = data => post('/job/add_tag', data);
//修改个人标签:  job/edit_tag  get
export const editTag = data => get('/job/edit_tag');
//修改个人标签   post:tag:有标签ID用','组成的字符串
export const postEditTag = data => post('/job/edit_tag', data);
//新增自我描述    post('add_describe');  参数:describe (字符串)
export const addDescribe = data => post('/job/add_describe', data);
// 修改自我描述:    job/edit_describe     get     post:describe(自我描述字符串)
export const editDescribe = data => get('/job/edit_describe');
export const postAddDescribe = data => post('/job/edit_describe', data);
// 新增工作经历:     job/add_work	post  公司名称:companyname,职位名:jobs,开始时间:start_time,结束时间:end_time  可选参数:duty:工作职责
export const addWork = data => post('/job/add_work', data);
//获取已新增工作经历           get('edit_work/{work_id}
export const getWork = data => get(`/job/edit_work/${data.id}`);
//修改工作经验         post('edit_work/{work_id}
export const editWork = data => post(`/job/edit_work/${data.id}`, data);
//新增教育经历         post('add_education    学校:school,专业:speciality,学历:education,开始时间:start_time,结束时间:end_time
export const addEducation = data => post('/job/add_education', data);
//获取已新增教育经历           get('edit_education/{education_id}
export const getEducations = data => get(`/job/edit_education/${data.id}`);
//修改教育经历           post('edit_education/{education_id}
export const editEducation = data => post(`/job/edit_education/${data.id}`, data);
//新增培训经历     post('add_train    培训机构名称:agency	培训课程名称:description	开始时间:start_time	结束时间:end_time,可选参数：content:培训内容
export const addTrain = data => post('/job/add_train', data);
//获取已新增培训经历        get('edit_train/{train_id}
export const getTrain = data => get(`/job/edit_train/${data.id}`);
//修改培训经历         post('edit_train/{train_id}
export const editTrain = data => post(`/job/edit_train/${data.id}`, data);

// //新增公司标签:        job/add_tag		get		post        post参数:tag (字符串)
// export const getTag= data => get('/job/get_tag');
// export const postTag= data => post('/job/get_tag',data);
//关注的公司  get('attention_com','PersonalController@attention_com');
export const attentionCom = data => get('/job/attention_com');
//收藏的职位   job/index/collect
export const getCollect = data => get('/job/index/collect');
//求职进展   get('process',);
export const getProcess = data => get('/job/process');

//消息//

// 面试邀请      get('jobs_interview');
export const getInterview = data => get('/job/jobs_interview');




//公司接口

//首页
// 简历列表:  get
export const resumeList = data => get('/job/list');
//下一页列表
export const nextList = data => get(`${data}`);
//上一页列表
export const prevList = data => get(`${data}`);
// 简历详情:  get	简历ID
export const resumeShow = data => get(`/job/resume_show/${data.id}`);
//发送面试邀请: 	get post   简历ID
export const interviewGet = data => get(`/job/interview_add/${data.id}`);
export const interviewPost = data => post(`/job/interview_add/${data.resume_id}`,data);
//收藏简历/取消收藏      get('collect_resume/{resume_id}
export const collectResume = data => get(`/job/collect_resume/${data.resume_id}`);


//消息
//消息列表          get('news_list/{type}
export const getNewslist = data => get(`/job/news_list/${data.id}`);
//消息列表2   job/new_notice/{type}  1个人2企业
export const newNotice = data => get(`/job/new_notice/${data.id}`);

//消息列表的详情       get('new_details/{messid}
export const getNewdetails = data => get(`/job/new_details/${data.id}`);
//企业/个人处理消息  post       reply/{type} type:1个人 2企业     企业: 1:合适 2:不合适 3:待定      个人: 1:同意 2:不同意    传值id   state
export const reply = data => post(`/job/reply/${data.type}`,data);

//我的
//先获取新增企业信息所需信息   get('add_company
export const getAddCompany = data => get('/job/add_company');
//新增企业信息    post('add_company
export const postAddCompany = data => post('/job/add_company',data);
//获取是否已新增企业信息         get('edit_company
export const getEditCompany = data => get('/job/edit_company');
//修改企业信息        post('edit_company
export const postEditCompany = data => post('/job/edit_company',data);
//收到的简历          get('jobs_apply
export const getJobsApply = data => get('/job/jobs_apply');
//已下载简历列表     get('down_list
export const getDownList = data => get('/job/down_list');
//收藏的简历     get('resume_favorites
export const getResumeFavorites = data => get('/job/resume_favorites');
//面试邀请列表    get('jobs_interview
export const getJobsInterview = data => get('/job/jobs_interview_list');
//发布职位前的获取 get('jobs_add
export const getJobsAdd = data => get('/job/jobs_add');
//发布职位       post('jobs_add
export const postJobsAdd = data => post('/job/jobs_add',data);
//年龄要求:      	get    job/get_age
export const getAge = data => get('/job/get_age');
//公司福利标签     get('get_tag
export const geTag = data => get('/job/get_tag');
// 发布的职位列表:         get   job/index/comid
export const getPositionList = data => get('/job/index/comid');
//修改职位前的get          get('jobs_edit/{position_id}           state 0:关闭 1:正常 2:等待审核
export const getJobEdit = data => get(`/job/jobs_edit/${data.id}`);
//修改职位        post('jobs_edit/{position_id}
export const postJobsEdit = data => post(`/job/jobs_edit/${data.id}`,data);
//删除职位          get('jobs_del/{position_id}
export const getJobsDel = data => get(`/job/jobs_del/${data.id}`);
