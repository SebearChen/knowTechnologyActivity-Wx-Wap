export default {
    data() {
        return {
            SHARE_LINK_DOMAIN: process.env.VUE_APP_NODE_ENV == 'production' ? 'fyykjx.decisionrank.com' : 'www1.pconline.com.cn',
            OPENINSTALL_LINK: process.env.VUE_APP_NODE_ENV == 'production' ? '' : 'case%2Ftest%2F',
            LOGIN_TOKEN: process.env.VUE_APP_NODE_ENV == 'production' ? 'common_session_id' : 'common_session_id1',
            WX_AUTHO_TOKEN: "act_blind_box_token"
        }
    },
    methods: {
        setCookie(name, value, day, path, domain, secure) {
            path = path ? path : '/'
            domain = domain ? domain : '.pcauto.com.cn'
            try {
                var expire = "";
                expire = new Date();
                expire.setTime(expire.getTime() + day * 24 * 3600 * 1000);
                expire = expire.toGMTString();
                secure = secure ? ";secure=" + secure : ""
                document.cookie = name + "="+ escape(value) + ";expires=" + expire + ";path=" + path + ";domain=" + domain + secure
            }catch(e) {
                console.warn(e)
            }
        },
        getCookie(name) {
            try {
                var arr = document.cookie
                    .match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null)
                    return unescape(arr[2]);
                return null;
            }catch(e) {
                console.warn(e)
                return null;
            }            
        },
        rmCookie(name, path, domain, secure) {
            var value = this.getCookie(name)
            if (value !== null) {
                var exp = new Date()
                exp.setMinutes(exp.getMinutes - 1000)
                path = path || "/"
                document.cookie = `${name}=;expirs=${exp.toGMTString()};${path ? `path=${path};` : ''}${domain ? `domain=${domain};` : ''}${secure ? `secure=${secure};` : ''}`
            }
        },
        setStorage(name, value) {
            if (!name || !value) {
                console.warn('cant not set name&value of null')
                return
            }
            value = JSON.stringify(value)
            window.localStorage.setItem(name, value)
        },
        getStorage(name) {
            if (!name) {
                console.warn('cant not get name of null')
                return
            }
            let _val = window.localStorage.getItem(name)
            return JSON.parse(_val)
        },
        rmStorage(name) {
            if (!name) {
                console.warn('cant not get name of null')
                return
            }
            window.localStorage.removeItem(name)
        }
    },
}
