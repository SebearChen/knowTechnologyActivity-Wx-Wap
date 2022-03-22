export default {
    methods: {
        getReferer(){
            return window.document.referrer ? window.document.referrer : 'pcauto.com.cn'
        },
        getUA() {
            return window.navigator.userAgent ? window.navigator.userAgent : false
        }
    },
}
