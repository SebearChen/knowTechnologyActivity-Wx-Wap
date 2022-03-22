export default {
    methods: {
        isMobileFn() {
            let reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
            if ((navigator.userAgent.match(reg))) {
                return true;
            }else{
                return false;
            }
        },
        browserType() {
            return {
                isSafari: (navigator.userAgent.indexOf('Safari')>=0 || navigator.userAgent.indexOf('WebKit')>=0)? true:false,
                isOpera: (window.opera && navigator.userAgent.indexOf('Opera')>=0)? true:false,
                isChrome:(navigator.userAgent.indexOf('Chrome/')>=0 && navigator.userAgent.indexOf('WebKit')>=0)? true:false,
                domAPI:(document && document.createElement)? true:false,
                isMac:(navigator.userAgent.indexOf('Mac')>=0)? true:false,
            }
        },
        IsWX() {
            let ua = window.navigator.userAgent.toLowerCase();
	        return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
        },


        isiOS() {
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return isiOS;
        },
        bigScreen() {
            const rate = window.screen.height/window.screen.width;
            return rate > 1.8
        }
     },
}
