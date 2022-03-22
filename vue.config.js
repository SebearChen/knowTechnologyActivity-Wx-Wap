const path = require("path");
const resolve = dir => path.join(__dirname, dir);


module.exports = {
  outputDir: process.env.OUTPUT_DIR,
  publicPath: './',

  productionSourceMap: false,

  chainWebpack: config => {
    config
      .entry('index')
      .add('babel-polyfill')
      .end();
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@views", resolve("src/views"))
      .set("@config", resolve("src/config"))
      .set("@utils", resolve("src/utils/"))
      .set("@http", resolve("src/http"))
      .set("@api", resolve("src/http/api"))
      .set("@mixin", resolve("src/mixin"))
      .set("@components", resolve("src/components"))
      .set("@images", resolve("src/assets/images"))
      .set("@svg", resolve("src/assets/svg"));
    // 移除 prefetch 插件
		config.plugins.delete("prefetch-index");
		// 移除 preload 插件
		config.plugins.delete("preload-index");
  },
  css: {
    loaderOptions: {
      // 配置全局scss和mixin
      sass: {
        prependData: `
          @import "@/style/mixin.scss";
          @import "@/style/common.scss";
        `
      }
    }
  },
  lintOnSave: false,
  devServer: {
    host: "192.168.33.87",
    // host: "192.168.33.168",
    port: 8080,
    proxy: {
      '/ag/api': {
        target: 'https://qa-act1.pconline.com.cn',
        changeOrigin: true
      },
      '/api': {
        target: 'https://qa-act1.pconline.com.cn',
        changeOrigin: true
      },
      '/upload_quick': {
        target: 'http://t-upc.pcauto.com.cn',
        changeOrigin: true
      }
    },
    disableHostCheck: true
  }
}
