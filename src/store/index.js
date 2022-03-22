import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let files = require.context('.', false, /\.js$/)
let storeConfig = {};



files.keys().forEach(file => {
  if(file == './index.js') return

  var storEntity = files(file).default

  storeConfig[storEntity.name] = storEntity.default

})


export default new Vuex.Store(storeConfig)
