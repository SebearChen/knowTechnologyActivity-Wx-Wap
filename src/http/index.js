
const contexts = require.context('.', false, /api.js/)

export default (Vue) => {
    Vue.prototype.$api = {}
    contexts.keys().forEach(item => {
        const apis = contexts(item);
        Object.keys(apis).forEach(item => {
            Vue.prototype.$api[item] = apis[item]
        })
    });
}


