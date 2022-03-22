import * as utils from './utils.js'

export default (Vue) => {
    Vue.prototype.$utils = {}
    Object.keys(utils).forEach(item => {
        // 设置vue全局变量
        Vue.prototype.$utils[item] = utils[item]
    })
}