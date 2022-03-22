
let files = require.context('.', false, /\.vue$/);

export default (Vue) => {
    files.keys().forEach(item => {
        let componentEntity = files(item).default;
        
        // 安装全局组件
        Vue.component(componentEntity.name, componentEntity);
    });
}



