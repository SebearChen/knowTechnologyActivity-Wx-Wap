import sensors from '@/assets/sdk/sensorsdata.es6.min.js' // 引入神策sdk
window.sensors = sensors // 将神策对象放到全局变量中

import sensorsEvent from './sensorsEvent.js' // 引入封装好的神策埋点事件

let server_url, show_log

if (process.env.VUE_APP_NODE_ENV == 'production') { // 生产环境
    server_url = window.location.protocol + '//pcsac.pc.com.cn/sa?project=xiaofei'
    show_log = false
} else { // 非生产环境
    server_url = window.location.protocol + '//pcsac.pc.com.cn/sa?project=xiaofeitest'
    show_log = true
}

// 神策初始化
window.sensors.init({
    server_url, // 服务器URL
    show_log, // 日志打印
    use_app_track: false // 是否开启App打通H5
})

let env ;
//判断微信环境
let ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'==true){
        env='wx';
    }
//判断pc和wap
let reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
if ((navigator.userAgent.match(reg))) {
    env='wap';
}else{
    env='pc';
}

// 注册公共属性
window.sensors.registerPage({
    pconline_activity_name: 'pconline_年底开团活动2021', //活动名称
    pconline_position_name: env,    //推广位名称
    pconline_page_url: function () {
        return window.location.href   //页面url
    }
})





export default (Vue) => {
    // 将封装好的埋点事件放到Vue的原型中
    Vue.prototype.$sensorsEvent = {}
    Object.keys(sensorsEvent).forEach(item => {
        Vue.prototype.$sensorsEvent[item] = sensorsEvent[item]
    })
}