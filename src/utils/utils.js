import { csidKey } from "../config/config"
// 获取正常url query值
export const getUrlQuery = (name) => {
    try {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var _query = window.location.href.split('?')[1]
        var r = _query ? _query.match(reg):null;

        if (r != null) return unescape(r[2]); 
        return null; 
    }catch(e) {
        console.warn(e)
        return null
    }    
}
// 获取正常多？ query值
export const getVueQuery = () => {
    const obj = {}
    /* 获取url query值 */
    window.location.href.split('?').forEach(item=> {
        if (item.indexOf('&')!=-1) {
            item.split('&').forEach(i=> {
                if (i.indexOf('=')!=-1) {
                    obj[i.split('=')[0]] = i.split('=')[1]
                }
            })
        }else if(item.indexOf('=')!=-1) {
            obj[item.split('=')[0]] = item.split('=')[1]
        }
    })
    return obj
}
// 太平洋APP环境登录
export const appLogin = ()=>{
    window.appCallback = function(_csid) {

        if (!_csid) return;

        if (getCookie(csidKey)) {
            return;
        }
        else {
            writeCookie(csidKey, _csid, 1);
        }
        setTimeout(() => {
            window.location.reload()
        }, 50)
    }
    window.location.href = 'pcaction://user-login/?callback=appCallback'
}
// app环境微信登录
export function wechatLogin() {
    window.appCallback = function() {
        window.location.reload()
    }
    window.location.href = 'pcaction://weixin-bind/?callback=appCallback'
}

// 写入cookie
export function writeCookie(name, value, day) {
    let expire = "";
    expire = new Date();
    expire.setTime(expire.getTime() + day * 24 * 3600 * 1000);
    expire = expire.toGMTString();
    document.cookie = name + "=" + escape(value) + ";expires=" + expire;
    location.href = location.href;
}
// 读取cookie函数
export function getCookie(name) {
    var arr = document.cookie
            .match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}
// 判断是否是ios
export function isiOS() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isiOS;
}
// 按需引入js插件
export function getScript(url, callback, errorback, charset){
    var scr = document.createElement('script');
    scr.charset = charset?charset:"utf-8";
    scr.onload = scr.onreadystatechange = function(){
         var st = scr.readyState;
         if(st && st!=='loaded' && st!=='complete') return;
         scr.onload = scr.onreadystatechange = null;
         callback && callback();
    };
    scr.onerror = function (e) {
        errorback && errorback(e)
    };
    scr.src = url;
    document.getElementsByTagName('head')[0].appendChild(scr);
}
export function IsWX() {
    let ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false;
}

export  function  isMobileFn() {
    let reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    if ((navigator.userAgent.match(reg))) {
        return true;
    }else{
        return false;
    }
}

// 获取H5运行环境。1：在太平洋APP打开。2：在微信环境打开。3：普通浏览器
export function getRunBrowser() {
    return window.PCJSKit||(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers&&window.webkit.messageHandlers.PCJSKit) ? 1 : IsWX() ? 2 : 3
}
// 判断是否在APP 的 wk浏览器中。是否是WKWebView的APP浏览器（如是在app中请使用最新方法：https://wiki-dev.pc.com.cn/pages/viewpage.action?pageId=27066572）0：否; 1：是
export function judgeWK() {
    return (window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers&&window.webkit.messageHandlers.PCJSKit)?1:0
}
// 验证电话号码
export function checkPhone(phone) {
	var pattern = /(^[0-9]{3,4}\-[0-9]{5,8}$)|(^0{0,1}1[0-9]{10}$)/;
    return pattern.test(phone)
}
// 校验中文姓名
export function checkName(name) {
	var pattern = /^[\u4e00-\u9fa5a-zA-Z\s]{1,20}$/;
    return pattern.test(trim(name))
}
//删除左右两端的空格
export function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * Vue特制防抖
 * @param {String} fnName 函数名 字符串类型
 * @param {Number} time 
 * @returns 
 */
export function vueDebounce(fnName, time) {
    let timeout = null
    return function () {
        if (timeout) {
        clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
        this[fnName](...arguments)
        }, time)
    };
}
/**
 * Vue特制节流
 * @param {String} fnName 函数名 字符串类型
 * @param {Number} time 
 * @returns 
 */
export function vueThrottle (fnName, time) {
    let canRun = true 
    return function () {
        if (!canRun) return
        canRun = false
        this[fnName](...arguments)
        setTimeout(() => {
            canRun = true
        }, time)
    }
}
  
