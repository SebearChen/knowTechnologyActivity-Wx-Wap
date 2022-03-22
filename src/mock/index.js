export default () => {
    const Mock = require('mockjs')

    const files = require.context('.', true, /\.js/)

    const baseUrl = '/api' // 基础url

    files.keys().forEach(key => {
        if (key == './index.js') return
        const res = files(key).default

        const urlStr = baseUrl + res.url

        const url = new RegExp(urlStr) // mock的正则url
        const method = res.method // mock的请求方法
        const data = res.data // mock的响应数据
        
        Mock.mock(url, method, request => { // mock
            console.log('mock data', {
                url: request.url, // 请求的url
                type: request.type, // 请求的发方法类型
                requestBody: JSON.parse(request.body), // 请求体数据
                responseData: data // 响应的数据
            })
            return data
        })
    })
}
