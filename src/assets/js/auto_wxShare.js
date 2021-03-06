var wxApi = {
    CONSTANTS: {
        wxApiSignUrl_online: "//mrobot.pconline.com.cn/v3/weixin/getSign?account=pconline_cn&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_auto: "//mrobot.pcauto.com.cn/v3/weixin/getSign?account=chinacar666&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_geeknev: "//mrobot.pcauto.com.cn/v3/weixin/getSign?account=geeknev&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_baby: "//mrobot.pcbaby.com.cn/v3/weixin/getSign?account=pcbaby_cn&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_lady: "//mrobot.pclady.com.cn/v3/weixin/getSign?account=modeng_xzs&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_games: "//mrobot.pcgames.com.cn/v3/weixin/getSign?account=pcgames_cn&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_house: "//mrobot.pchouse.com.cn/v3/weixin/getSign?account=PChouse-2010&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_yqhapp: "//mrobot.pconline.com.cn/v3/weixin/getSign?account=yqhapp&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),
        wxApiSignUrl_3conline: "//act.pcauto.com.cn/wx/mp/sdkConfig?key=3conline&callback=wxApi.wxConfig&url=" + encodeURIComponent(location.href.split("#")[0]),        
        wxApiJSUrl: "//res.wx.qq.com/open/js/jweixin-1.0.0.js"
    },
    getScript: function(b) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = b.url;
        a.charset = b.charset || "UTF-8";
        a.onload = a.onreadystatechange = function() {
            if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null;
                b.callback && b.callback()
            }
        };
        document.getElementsByTagName("head")[0].appendChild(a)
    },
    wxConfig: function(a) {
        wx.config({
            debug: false,
            appId: a.appId,
            timestamp: a.timestamp,
            nonceStr: a.nonceStr,
            signature: a.signature,
            jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems", "hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "translateVoice", "startRecord", "stopRecord", "onRecordEnd", "playVoice", "pauseVoice", "stopVoice", "uploadVoice", "downloadVoice", "chooseImage", "previewImage", "uploadImage", "downloadImage", "getNetworkType", "openLocation", "getLocation", "hideOptionMenu", "showOptionMenu", "closeWindow", "scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard", "chooseCard", "openCard"]
        })
    },
    init: function(b) {
        if (navigator.userAgent.toLowerCase().match(/micromessenger/i) != "micromessenger") {
            return
        }
        var a;
        switch (window.location.hostname.replace(/\w+((\.\w+)+)/, "$1")) {
            case ".decisionrank.com":
                a = this.CONSTANTS.wxApiSignUrl_online;
                break;
            case ".pconline.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_online;
                break;
            case ".pcauto.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_auto;
                break;
            case ".pcvideo.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_auto;
                break;
            case ".geeknev.com":
                a = this.CONSTANTS.wxApiSignUrl_geeknev;
                break;
            case ".pclady.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_lady;
                break;
            case ".pcbaby.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_baby;
                break;
            case ".pcgames.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_games;
                break;
            case ".pchouse.com.cn":
                a = this.CONSTANTS.wxApiSignUrl_house;
                break;
            case ".yqhapp.com":
                a = this.CONSTANTS.wxApiSignUrl_yqhapp;
                break;
            case ".3conline.com":
                a = this.CONSTANTS.wxApiSignUrl_3conline;
                break;    
            default:
                return false;
                break
        }
        var c = this;
        c.getScript({
            url: this.CONSTANTS.wxApiJSUrl,
            callback: function() {
                c.getScript({
                    url: a,
                    callback: function() {
                        wx.ready(function() {
                            b && b()
                        });
                        wx.error(function(d) {})
                    }
                })
            }
        })
    }
};