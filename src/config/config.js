// 正式域名 
const DOMAIN_P = {
    auto: '//act1.pconline.com.cn',
    upc: "//upc.pcauto.com.cn",
};
const DOMAIN_Q = {
    auto: "//qa-act1.pconline.com.cn",
    upc: "//t-upc.pcauto.com.cn",
};
const DOMAIN_D = {
    auto: "//qa-act1.pconline.com.cn",
    upc: "",
};
export const env = process.env.VUE_APP_NODE_ENV
export const service = env == 'production' ? DOMAIN_P : env == 'qa' ? DOMAIN_Q : env == 'experience' ? DOMAIN_Q : DOMAIN_D

// 活动id
export const activityId = 1

const flag = env == 'experience' ? 'seckill2' : 'seckill'

export const fetchPrefix = '/ag/api'

export const csidKey = env == 'production' ? 'common_session_id' : 'common_session_id1'

export const downLoadAppUrl = 'https://www1.pcauto.com.cn/zt/gz20200303/jump/jump-wap.html?edition=Pcauto06&ad='
export const userRoleUrl = 'https://www1.pcauto.com.cn/zt/gz20171127/declare/wap.html'

export default {
    env,
    fetchPrefix,
    service,
    csidKey,
    downLoadAppUrl,
    userRoleUrl
}