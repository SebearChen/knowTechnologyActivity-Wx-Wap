import fetcher from '@http/fetch.js'
import { service, fetchPrefix, activityId } from '@config/config.js'


/**
 * 图片上传（file格式上传）
 * ******referer=http://xxx.pcauto.com.cn/admin/***** 不需要登录标识符
 * data { String } [true] file
 */
export const fetchUpLoadImg1 = data => {
    if (!data) {
        console.warn('data不能为空')
        return
    }
    let formData = new FormData()
    formData.append('photoFile', data)
    
    return fetcher(`${service.upc}/upload_quick.jsp?referer=http://xxx.pcauto.com.cn/admin/&keepSrc=yes&readExif=no&application=play`, formData, 'post' )
}
/**
 * 上传图片
 * application: "play",
 * readExif: "yes",
 * keepSrc: "yes",
 * data: _data //base64字符
 */
export const fetchUpLoadImg2 = data => {
    data = {
        application: "play",
        readExif: "yes",
        keepSrc: "yes",
        data
    }
    return fetcher(`${service.upc}/upload_quick_base64.jsp?referer=http://xxx.pcauto.com.cn/admin/`, data, 'post')
}

/**
 * 事件计数器
 * id { string } 事件计数器id
 */
export const countAd = (id) => {
    var img = new Image;
    img.src = `//count.pcauto.com.cn/count.php?channel=${id}&screen=${screen.width}*${screen.height}&refer=${encodeURIComponent(document.referrer)}&anticache=${new Date().getTime()}&url=${encodeURIComponent(location.href)}&from=event`
}


// 获取当前团信息
export const fetchGroupDetailData = data => fetcher(`${service.auto}${fetchPrefix}/act/${activityId}/group/share/${data.groupId}`, '', 'get')

// 当前服务器时间
export const fetchServerTime = data => fetcher(`${service.auto}${fetchPrefix}/act/${activityId}/group/time`, '', 'get')