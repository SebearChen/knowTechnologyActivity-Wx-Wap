/**
 * 页面浏览事件
 * @param {String} pconline_page_url 页面URL
 * @param {String} pconline_page_name 页面名称
 * @param {String} pconline_share_people 分享人
 */
 export const detailView = (pconline_page_name,pconline_share_people) => {
    window.sensors.track('PConlineActivityDetailView', {
        pconline_page_name,
        pconline_share_people
    });
}

/**
 * 按钮点击事件
 * @param {String} pconline_page_url 页面URL
 * @param {String} pconline_page_name 页面名称
 * @param {String} pconline_popup_name 弹窗名称
 * @param {String} pconline_popup_context 弹窗文案内容
 * @param {String} pconline_button_name 按钮名称
 * @param {String} pconline_share_people 分享人
 */
export const buttonClick = (pconline_page_name,
    pconline_popup_name,
    pconline_popup_context,
    pconline_button_name,
    pconline_share_people) => {
    window.sensors.track('PConlineActivityButtonClick', {
        pconline_page_name,
        pconline_popup_name,
        pconline_popup_context,
        pconline_button_name,
        pconline_share_people
    });
}

/**
 * 弹窗弹出事件
 * @param {String} pconline_page_name 页面名称
 * @param {String} pconline_popup_name 弹窗名称
 * @param {String} pconline_popup_context 弹窗文案内容
 */
 export const popup = (pconline_page_name, pconline_popup_name,pconline_popup_context) => {
    window.sensors.track('PConlinePopUp', {
        pconline_page_name,
        pconline_popup_name,
        pconline_popup_context
    });
}


/**
 * 元素曝光事件
 * @param {String} pcauto_page_name 页面名
 * @param {String} pcauto_exposure_element 曝光元素名 
 */
export const exposure = (pcauto_page_name, pcauto_exposure_element) => {
    window.sensors.track('PcautoActivityExposure', {
        pcauto_page_name,
        pcauto_exposure_element
    });
}

export default {
    detailView,
    buttonClick,
    popup,
    // linkClick,
    exposure
}
