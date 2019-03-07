import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index/index'
import user from '@/views/index/user'
import message from '@/views/message/index'
import me from '@/views/me/index'
import choose from '@/views/choose/index'
import company from '@/views/company/index'
import detail from '@/views/index/detail'
import comDetail from '@/views/index/comDetail'
import resumeDetail from '@/views/company/resumeDetail'
import myResume from '@/views/me/myResume'
import resumeHeader from '@/views/me/resumeHeader'
import invite from '@/views/company/invite'
import workExperience from '@/views/me/workExperience'
import eduExperience from '@/views/me/eduExperience'
import academicCertificate from '@/views/me/academicCertificate'
import tags from '@/views/me/tags'
import followedCo from '@/views/me/followedCo'
import collectionPosition from '@/views/me/collectionPosition'
import jobProgress from '@/views/me/jobProgress'
import selfEvaluation from '@/views/me/selfEvaluation'
import search from '@/views/index/search'
import trainExperience from '@/views/me/trainExperience'
import coMessage from '@/views/coMessage/index'
import coMe from '@/views/coMe/index'
import coInfo from '@/views/coMe/coInfo'
import coRecive from '@/views/coMe/coRecive'
import coDownload from '@/views/coMe/coDownload'
import coCollect from '@/views/coMe/coCollect'
import coInterview from '@/views/coMe/coInterview'
import coPost from '@/views/coMe/coPost'
import coManage from '@/views/coMe/coManage'
import editPost from '@/views/coMe/editPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {auth: false, navshow: true, keepAlive: true},
    },{
      path: '/user',
      name: 'user',
      component: user,
      meta: {auth: false, navshow: true, keepAlive: false},
    },{
      path: '/message',
      name: 'message',
      component: message,
      meta: {auth: true, navshow: true, keepAlive: false},
    },{
      path: '/me',
      name: 'me',
      component: me,
      meta: {auth: false, navshow: true, keepAlive: false},
    },{
      path: '/choose',
      name: 'choose',
      component: choose,
      meta: {auth: true, navshow: false, keepAlive: false},
    },{
      path: '/company',
      name: 'company',
      component: company,
      meta: {auth: false, navshow: true, keepAlive: true},
    },{
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/comDetail',
      name: 'comDetail',
      component: comDetail,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/resumeDetail',
      name: 'resumeDetail',
      component: resumeDetail,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/myResume',
      name: 'myResume',
      component: myResume,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/resumeHeader',
      name: 'resumeHeader',
      component: resumeHeader,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/invite',
      name: 'invite',
      component: invite,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/workExperience',
      name: 'workExperience',
      component: workExperience,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/eduExperience',
      name: 'eduExperience',
      component: eduExperience,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/academicCertificate',
      name: 'academicCertificate',
      component: academicCertificate,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/tags',
      name: 'tags',
      component: tags,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/followedCo',
      name: 'followedCo',
      component: followedCo,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/collectionPosition',
      name: 'collectionPosition',
      component: collectionPosition,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/jobProgress',
      name: 'jobProgress',
      component: jobProgress,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/selfEvaluation',
      name: 'selfEvaluation',
      component: selfEvaluation,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/search',
      name: 'search',
      component: search,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/trainExperience',
      name: 'trainExperience',
      component: trainExperience,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coMessage',
      name: 'coMessage',
      component: coMessage,
      meta: {auth: false, navshow: true, keepAlive: false},
    },{
      path: '/coMe',
      name: 'coMe',
      component: coMe,
      meta: {auth: false, navshow: true, keepAlive: false},
    },{
      path: '/coInfo',
      name: 'coInfo',
      component: coInfo,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coRecive',
      name: 'coRecive',
      component: coRecive,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coDownload',
      name: 'coDownload',
      component: coDownload,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coCollect',
      name: 'coCollect',
      component: coCollect,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coInterview',
      name: 'coInterview',
      component: coInterview,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coPost',
      name: 'coPost',
      component: coPost,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/coManage',
      name: 'coManage',
      component: coManage,
      meta: {auth: false, navshow: false, keepAlive: false},
    },{
      path: '/editPost',
      name: 'editPost',
      component: editPost,
      meta: {auth: false, navshow: false, keepAlive: false},
    },
  ]
})
