// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css';
import '../static/css/common.css';
import {Swipe,SwipeItem} from 'vant'
import { Actionsheet } from 'vant';
import { Toast } from 'vant';
import { Area } from 'vant';
import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangCh from '../static/lang/ch'

Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Actionsheet);
Vue.use(Toast);
Vue.use(Area);


Vue.use(VueI18n)

//语言标识
const i18n = new VueI18n({
  locale: 'en_US', // 语言标识
  messages:{
    'en_US': LangEn,
    'zh_CN': LangCh
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>',
})
