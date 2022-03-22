
import configData from './config'

export default (Vue) => {
    Vue.prototype.$config = {}
    Object.keys(configData).forEach(item => {
        // 设置vue全局变量
        Vue.prototype.$config[item] = configData[item]
    })
}
