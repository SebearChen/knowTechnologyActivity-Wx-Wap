export default {
    methods: {
        shareConfig(obj,type) {
            let _default = {
                title: '嗨！快入团，发福利啦~',
                desc: '天天红包雨下不停，速来>省钱省力买新车，就来太平洋汽车',
                imgUrl: 'https://www1.pcauto.com.cn/zt/act/super-brand-month/202111/main/wap/img/share.jpg',
                link: window.location.href.split('?')[0].replace('w1ssl','www1')
            }
            
            obj = Object.assign({}, _default, obj);
            if (this.$browserEnv==1) {
                let shareStr = JSON.stringify({
                  title: obj.title,
                  desc: obj.desc,
                  link: obj.link,
                  imgUrl: obj.imgUrl
                })
                if (this.isiOS()) {
                    window.webkit.messageHandlers.PCJSKit.postMessage({functionName: 'updateShareInfo', data: shareStr});
                }else {
                    window.PCJSKit.updateShareInfo(shareStr);
                }
              }else if (this.$browserEnv==2) {
                this.getScript("//js.3conline.com/wap/pcauto/common/auto_wxShare.js", () => {
                    //微信自定义分享
                    window.wxApi = wxApi
                    wxApi.init(function() {
                        var shareData = {
                            title: obj.title,
                            desc: obj.desc,
                            link: obj.link,
                            imgUrl: obj.imgUrl
                        };
                        wx.onMenuShareAppMessage(shareData); // 分享给朋友
                        wx.onMenuShareTimeline(shareData); // 分享到朋友圈
                        wx.onMenuShareQQ(shareData); // 分享到QQ
                        wx.onMenuShareWeibo(shareData); // 分享到微博
                    });
                })
            }
        },
        
        getScript(src, callback) {
            let scr = document.createElement("script");
            scr.onload = scr.onreadystatechange = function() {
                var st = scr.readyState;
                if (st && st !== "loaded" && st !== "complete") return;
                scr.onload = scr.onreadystatechange = null;
                callback();
            };
            scr.src = src;
            document.getElementsByTagName("head")[0].appendChild(scr);
        },
        isiOS() {
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return isiOS;
        }
    },
}