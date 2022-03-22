/* eslint-disable no-undef */
var wxApi = {
    CONSTANTS: {
      wxApiSignUrl_online:
        location.protocol +
        "//mrobot.pconline.com.cn/v3/weixin/getSign?account=pconline_zkj&callback=wxApi.wxConfig&url=" +
        encodeURIComponent(location.href.split("#")[0]),
      wxApiJSUrl: "//res.wx.qq.com/open/js/jweixin-1.6.0.js"
    },
    getScript: function(option) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = option.url;
      script.charset = option.charset || "UTF-8";
      script.onload = script.onreadystatechange = function() {
        if (
          !this.readyState ||
          this.readyState == "loaded" ||
          this.readyState == "complete"
        ) {
          this.onload = this.onreadystatechange = null;
          option.callback && option.callback();
        }
      };
      document.getElementsByTagName("head")[0].appendChild(script);
    },
    wxConfig: function(data) {
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        openTagList: ["wx-open-launch-app", "wx-open-launch-weapp"], // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
        jsApiList: [
          "checkJsApi",
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "translateVoice",
          "startRecord",
          "stopRecord",
          "onRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard"
        ]
      });
    },
    init: function(fn) {
      if (
        navigator.userAgent.toLowerCase().match(/micromessenger/i) !=
        "micromessenger"
      )
        return;
      var wxApiSignUrl;
      switch (window.location.hostname.replace(/\w+((\.\w+)+)/, "$1")) {
        case ".pconline.com.cn":
        case ".pconline.pcvideo.com.cn":
        case ".pcvideo.com.cn":
        case ".pcpet.com.cn":
        case ".pchealthy.com.cn":
          wxApiSignUrl = this.CONSTANTS.wxApiSignUrl_online;
          break;
        default:
          return false;
      }
      var _this = this;
      _this.getScript({
        url: this.CONSTANTS.wxApiJSUrl,
        callback: function() {
          _this.getScript({
            url: wxApiSignUrl,
            callback: function() {
              wx.ready(function() {
                fn && fn();
              });
              wx.error(function() {});
            }
          });
        }
      });
    }
  };
  
  function InitShareToFriend(option) {
    wxApi.init(function() {
      console.log("执行init share");
      wx.onMenuShareAppMessage(option);
      wx.onMenuShareTimeline(option);
      wx.onMenuShareQQ(option);
      wx.onMenuShareWeibo(option);
      wx.onMenuShareQZone(option);
    });
  }
  
  function updateShareToFriend(option) {
    // wx.ready(function() {
    //   console.log("执行update share ready");
    wx.updateAppMessageShareData(option);
    wx.updateTimelineShareData(option);
    // });
  }
  
  export { wxApi, InitShareToFriend, updateShareToFriend };
  
  // pconlinebrowser://
  