import {
    appLogin
  } from "@utils"
export default {
    methods: {
        login(url) {
            if (this.$browserEnv==1) {
                appLogin()
            }else {
                let _url = this.$env == 'production'?'https://m.pcauto.com.cn':'https://t-m.pcauto.com.cn'
                window.location.href = `${_url}/my/passport/mobileLogin.jsp?return=${url?url:window.location.href}`
            }
        }
    },
}