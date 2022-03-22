export default {
    methods: {
        // 将一维数组转化为二维数组
        formatArr(arr, group) {
            if (!arr||arr.length==0) {
                return []
            }
            let _arr = []
            if (arr.length+1<=group) {
                _arr.push(arr)
            }else {
                while(arr.length>0) {
                    if (arr.length>group) {
                        _arr.push(arr.splice(0,group))
                    }else {
                        _arr.push(arr)
                        arr = []
                    }
                }
            }
            return _arr
        }
    },
}
