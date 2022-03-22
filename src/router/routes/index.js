let files = require.context('.', false, /\.js/)

let routesConfigs = []

files.keys().forEach(key => {
    if (key == './index.js') return
    routesConfigs.push(files(key).default)
})

export default routesConfigs
