export default {
    methods: {
        createTop() {
            if (this.getCookie('topDlApp')) return;
            var that = this;
            /* 头部推广*/
            var head = document.getElementsByTagName("head")[0];
            var body = document.getElementsByTagName("body")[0];
            var topData = {
                "href" : "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u0077\u0077\u0031\u002e\u0070\u0063\u0061\u0075\u0074\u006f\u002e\u0063\u006f\u006d\u002e\u0063\u006e\u002f\u007a\u0074\u002f\u0067\u007a\u0032\u0030\u0031\u0035\u0031\u0030\u0030\u0038\u002f\u006a\u0075\u006d\u0070\u002f\u006a\u0075\u006d\u0070\u002d\u0077\u0061\u0070\u002e\u0068\u0074\u006d\u006c\u003f\u0061\u0064\u003d\u0031\u0032\u0036\u0031\u0033\u0026\u0061\u0070\u0070\u003d\u0070\u0063\u0061\u0075\u0074\u006f\u0026\u0065\u0064\u0069\u0074\u0069\u006f\u006e\u003d\u592a\u5e73\u6d0b\u6c7d\u8f66\u7f51\u005f\u5b98\u65b9\u7248",
                "img" : "//www1.pcauto.com.cn/app/20181120dingbu.png",
                "name" : "<em style='color:#333'>打开APP，每周五抢半价车名额！</em>",
                "des" : "\u770b\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u8f66\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u7528\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u8f66\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u4e0a\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u592a\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u5e73\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u6d0b\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u6c7d\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u8f66\u003c\u0073\u003e\u003c\u002f\u0073\u003e\u7f51",
                "btn" : "马<s></s>上<s></s>领<s></s>取",
                "app" : "\u0070\u0063\u0061\u0075\u0074\u006f",
                "edition" : "\u592a\u5e73\u6d0b\u6c7d\u8f66\u7f51\u005f\u5b98\u65b9\u7248"
            };
        
            function randomString(len) {
                var len = len || 32;
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                var maxPos = chars.length;
                var pwd = "";
                for (var i = 0; i < len; i++) {
                    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return pwd;
            }
            /* 随机类名*/
            var topClassname = randomString();
            var topFixStyle = 'undefined' == typeof(TOP_NO_FIX_FLAG) ? 'z-index:10;width:100%;' : '';
            /* 生成样式插入*/
            /*1215修改颜色 #ff7800-->#ff532c*/
            var topStyle = '.' + topClassname + '{width:100%;height:48px;position:relative;border-bottom: 0.5px solid #f0f0f0;}.' + topClassname + ' s{display:none}.' + topClassname + '>div{width:100%;height:48px;background:#fff;vertical-align:top;position:relative;' + topFixStyle + '}.' + topClassname + '>div>span{display:block;width:30px;height:30px;cursor:pointer;position:absolute;right:0;top:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiBAMAAADIaRbxAAAAElBMVEUAAACqqqqqqqqqqqqqqqqqqqp0ej6yAAAABXRSTlMAzhLHJYTkfVQAAABGSURBVCjPYxiygNkISDAZI4sEKjAwKAYjiTCJCoExElAMVAAiBhRFIlAlCEWhECUIwBIawoBPDcIcTLsw3YPpZkx/DR8AAK4/CLByLLLwAAAAAElFTkSuQmCC) no-repeat right top;background-size:17px;font-size: 0;line-height:0;overflow: hidden;}.' + topClassname + ' section{display:block;padding:0 0 0 10px;margin:0 auto;overflow:hidden;cursor:pointer;height:48px}.' + topClassname + ' section i{float:left;width:36px;height:36px;margin:6px 8px 0 0;overflow:hidden}.' + topClassname + ' section i img{display:block;width:36px;height:36px;}.' + topClassname + ' section div{float:left;font-size:15px;height:20px;line-height:20px;margin-top:14px}.' + topClassname + ' section div p:nth-child(1){font-size:15px;color:#333}.' + topClassname + ' section div p:nth-child(2){font-size:12px;color:#d2d2d2}.' + topClassname + ' section span{display:block;position:absolute;right:4%;top:11px;padding:0 9px;color:#fff;font-size:12px;background:#ff9900;border-radius:12px;height:24px;line-height:24px}@media only screen and (max-width:360px){.' + topClassname + ' section i{float:left;width:30px;height:30px;margin:9px 8px 0 0;overflow:hidden}.' + topClassname + ' section i img{display:block;width:30px;height:30px;}.' + topClassname + ' section div{float:left;font-size:14px;height:20px;line-height:20px;margin-top:14px}.' + topClassname + ' section div p:nth-child(1){font-size:14px;color:#333}}body{background-position:center 48px}.bodyys{background-position:center 0}';
            var topStyleEle = document.createElement("style");
            topStyleEle.type = "text/css";
            topStyleEle.appendChild(document.createTextNode(topStyle));
            head.appendChild(topStyleEle);
        
            var topHtml = '<div><section><i><img src="' + topData.img + '"></i><div><p>' + topData.name + '</p>' /*<p>' + topData.des + '</p>*/ + '</div><span>' + topData.btn + '</span></section><span>×</span></div>';
            var topDivEle = document.createElement("div");
            topDivEle.className = topClassname;
            topDivEle.innerHTML = topHtml;
            topDivEle.setAttribute("style", "display:block!important;");
            body.insertBefore(topDivEle, body.childNodes[0]);
            /* 点击关闭*/
            topDivEle.querySelector("div>span").addEventListener("click", function() {
                topDivEle.setAttribute("style", "display:none!important;");
                body.className = 'bodyys';
                that.setCookie("topDlApp", 1, 1, "pcauto.com.cn", "/");
            }, false);
            /* 点击*/
            topDivEle.querySelector("section").addEventListener("click", function() {
                that.count(1655);
                setTimeout(()=>{
                    that.checkDown();
                }, 500);
            })
        },
        checkDown() {
            window.location.href = 'https://www1.pcauto.com.cn/zt/gz20200303/jump/jump-wap.html?ad=13025&edition=PCauto1002'
        },
    }
}