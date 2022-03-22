import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import userConfig from '@config'
import installGlobalComponent from '@components/global'
import installApis from '@http'
import installUtils from '@utils/index.js'
import * as filters from '@/filters'
import installSensors from '@/sensors/index.js'
import installMock from '@/mock'
import installVconsole from '@/vconsole/index.js'
installVconsole(Vue)

import { Toast, Dialog, Button, Loading, NoticeBar, Lazyload, Col, Row, Swipe, SwipeItem } from 'vant'
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Loading);
Vue.use(NoticeBar);
Vue.use(Lazyload, {
  lazyComponent: true
});
Vue.use(Col);
Vue.use(Row);
Vue.use(Swipe);
Vue.use(SwipeItem)

userConfig(Vue)
installApis(Vue)
installUtils(Vue)
installSensors(Vue)
installGlobalComponent(Vue)

// 单独使用一个vue实例没有dom数据较轻
Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false

Vue.prototype.$browserEnv = Vue.prototype.$utils.getRunBrowser()
if (Vue.prototype.$browserEnv==1) {
  Vue.prototype.$wk = Vue.prototype.$utils.judgeWK()
}

/**
 * 路由守卫
 */
router.beforeEach((to, from, next)=> {
  window.scrollTo(0,0);
  if (window.location.href.indexOf('sharepop')>-1) {
    window.location.href = `${window.location.origin}${window.location.pathname}#/sharepop`
  }
  if (to.meta.title) {
    
    document.title = to.meta.title ? to.meta.title : ''
    
    // 兼容iphone手机title不会改变
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      var i = document.createElement('iframe');
      i.style.display = 'none';
      i.onload = function() {
          setTimeout(function(){
              i.remove();
          }, 17)
      }
      document.body.appendChild(i);
    }
  }
  next()
})

/**
 * 生产环境才启动mock模块
 */
if (process.env.NODE_ENV === 'development') {
  installMock()
}

/**
 * 挂载全局过滤器
 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
