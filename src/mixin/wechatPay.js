import judge from '@mixin/judge'

export default {
    mixins: [judge],
    data() {
        return {
            // 支付状态；0：支付成功，-2：取消支付，-1：支付失败，500：出现异常
            payStatus: null,

            fetchingThrottle: false,
            fetchTimer: null
        }
    },
    methods: {
        wechatPay(orderSn, payFn) {

            if (this.fetchingThrottle) {
                return
            }
            this.fetchingThrottle = true
            this.fetchTimer = setTimeout(()=> {
                this.fetchingThrottle = false
            }, 10000)


            if(this.$browserEnv==1) { //app环境
                this.wechatAppPay(orderSn, payFn)
            }else if (this.$browserEnv==2) { //微信环境
                this.wechatEnvPay(orderSn, payFn)
            }else if (this.$browserEnv == 3) { //浏览器环境
                this.wechatBrowserPay(orderSn, payFn)
            }
        },
        async wechatAppPay(orderSn, payFn) {
            let that = this
            payFn = payFn?payFn:'fetchWechatPay'

            let res = await this[payFn]({ orderSn, payType: 1 })
            // app环境设置回调
            window.callbackFn = data => {
                let code = "";
                if (this.isiOS()) {
                    code = data.code
                } else {
                    code = data
                }
                try {
                    if (code == '0') { /* 支付成功 */
                        that.payStatus = code
                    } else if (code == '-2') { /* 取消支付 */
                        that.payStatus = code 
                    } else if (code == '-1') { /* 支付失败 */
                        that.payStatus = code 
                    } else { /* 出错异常 */
                        that.payStatus = 500
                    }
                    
                    this.showPay = false
                } catch (e) {
                    that.payStatus = 500
                    that.$toast('出错异常')
                    console.warn(e)
                    this.showPay = false
                }
            }

            if (res.code == 200) {
                // 直接把 res.data.data 传给资讯app提供的微信支付方法
                let _data = res.data.data
                if (window.PCJSKit.callAppPay) {
                    window.PCJSKit.callAppPay(_data, '', "window.callbackFn");
                }else if (this.$wk==1) {
                    window.webkit.messageHandlers.PCJSKit.postMessage({functionName: 'callAppPay', data: _data});
                }else {
                    this.$toast("请更新到最新版本app：支付")
                }
            }else {
                console.warn(res)
                this.$toast(res.message)
            }

            clearTimeout(this.fetchTimer)
            this.fetchingThrottle = false
        },
        async wechatEnvPay(orderSn, payFn) {
            let that = this
            payFn = payFn?payFn:'fetchWechatPay'
            let res = await this[payFn]({ orderSn, payType: 2 })

            if (res.code == 200) {
                let pay = JSON.parse(res.data.data)
                // 发起支付
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId": pay.appId,             //公众号名称，由商户传入
                        "timeStamp": pay.timeStamp,     //时间戳，自1970年以来的秒数
                        "nonceStr": pay.nonceStr,       //随机串
                        "package": pay.package,
                        "signType": pay.signType,       //微信签名方式：
                        "paySign": pay.paySign          //微信签名
                    },
                    function (res) {
                        try {
                            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                                that.payStatus = 0  /* 支付成功 */
                            } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                                that.payStatus = -2  /* 取消支付 */
                            } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
                                that.payStatus = -1  /* 支付失败 */
                            }else {
                                that.payStatus = 500
                            }
                            // dosomething
                            this.showPay = false
                        } catch (e) {
                            that.payStatus = 500
                            this.$toast('出错异常');
                            console.warn(e)

                            // dosomething
                            this.showPay = false
                        }
                    });

            } else {
                if (res.code == 40001) {
                    // 微信公众号支付需要微信授权
                    let redirectUrl = encodeURIComponent(window.location.href)
                    let url = this.$env=='production'?
                        'https://act.pcauto.com.cn':'https://t-act.pcauto.com.cn'
                        
                    window.location.href = `${url}/seckill/api/auth/wx/authorize?redirectUrl=${redirectUrl}`
                } else {
                    console.warn(res)
                    this.$toast(res.message)
                }
            }

            clearTimeout(this.fetchTimer)
            this.fetchingThrottle = false
            
        },
        async wechatBrowserPay(orderSn, payFn) {
            payFn = payFn?payFn:'fetchWechatPay'
            let res = await this[payFn]({ orderSn, payType: 3 })

            if (res.code == 200) {
                // 支付完成后重定向地址
                let redirect_url = window.location.href;
                redirect_url = redirect_url.indexOf("?")==-1?`${redirect_url}?ipr=${new Date().getTime()}`:`${redirect_url}&ipr=${new Date().getTime()}`

                // 跳转去微信支付
                window.location.href = `${res.data.data}&redirect_url=${encodeURIComponent(redirect_url)}`
            } else {
                console.warn(res)
                this.$toast(res.message)
            }
            clearTimeout(this.fetchTimer)
            this.fetchingThrottle = false
        },
    },
}