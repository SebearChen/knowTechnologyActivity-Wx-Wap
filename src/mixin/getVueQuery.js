export default {
    methods: {
        getVueQuery() {
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
    },
}