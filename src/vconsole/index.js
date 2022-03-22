export default (Vue) => {
    let _evn = process.env.VUE_APP_NODE_ENV;
    if (_evn == 'production') return
    let Vconsole = require('vconsole')
    let vConsole = new Vconsole()
    Vue.use(vConsole)
}
