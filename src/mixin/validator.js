export default {
    data() {
        return {
            errorName: '请填写姓名',
            errorName1: '请填写姓名',
            errorIdType: '请选择证件类型',
            errorIdType1: '请选择证件类型',
            errorIdCard: '请填写证件号',
            errorIdCard1: '请填写证件号',
            errorPhone: '请填写手机号',
            errorPhone1: '请填写手机号',
            errorEmail: '请填写邮箱',
            errorEmail1: '请填写邮箱',
            
            
            name: '',
            idType: '',
            idCard: '',
            phone: '',
            email: '',

            name1: '',
            idType1: '',
            idCard1: '',
            phone1: '',
            email1: '',
        }
    },
    methods: {
        validatorName(val) {
            if (!val) {
                return false
            }
            if (val.length < 2) {
                this.errorName = '姓名不能少于两个字符'
                this.name = ''
                return false
            }else {
                return true
            }
        },
        validatorName1(val) {
            if (!val) {
                return false
            }
            if (val.length < 2) {
                this.errorName1 = '姓名不能少于两个字符'
                this.name1 = ''
                return false
            }else {
                return true
            }
        },
        validatorIdType(val) {
            return !!val
        },
        validatorIdType1(val) {
            return !!val
        },
        validatorIdCard(val) {

            if (!val) {
                return false
            }
            switch (this.idType) {
                case '身份证':
                    const reg1 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
                    if (reg1.test(val) == false) {
                        this.errorIdCard = '请输入正确的身份证号码'
                        this.idCard = ''
                        return false
                    }else {
                        return true
                    }
                case '护照':
                    const reg2 = /^([a-zA-z]|[0-9]){5,17}$/
                    if (reg2.test(val) == false) {
                        this.errorIdCard = '请输入正确的护照号码'
                        this.idCard = ''
                        this.idCard = ''
                        return false
                    }else {
                        return true
                    }
                case '军人证':
                    const reg3 = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/
                    if (reg3.test(val) == false) {
                        this.errorIdCard = '请输入正确的军官证'
                        this.idCard = ''
                        return false
                    }else {
                        return true
                    }
                case '港澳回乡证或台胞证':
                    const reg4 = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
                    const reg5 = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
                    if (reg4.test(val) || reg5.test(val)) {
                        return true
                    }else {
                        this.errorIdCard = '请输入正确的港澳回乡证或台胞证'
                        this.idCard = ''
                        return false
                    }
            }
        },
        validatorIdCard1(val) {
            if (!val) {
                return false
            }
            switch (val) {
                case '身份证':
                    const reg1 = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
                    if (reg1.test(val) == false) {
                        this.errorIdCard1 = '请输入正确的身份证号码'
                        this.idCard1 = ''
                        return false
                    }else {
                        return true
                    }
                case '护照':
                    const reg2 = /^([a-zA-z]|[0-9]){5,17}$/
                    if (reg2.test(val) == false) {
                        this.errorIdCard1 = '请输入正确的护照号码'
                        this.idCard1 = ''
                        return false
                    }else {
                        return true
                    }
                case '军人证':
                    const reg3 = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/
                    if (reg3.test(val) == false) {
                        this.errorIdCard1 = '请输入正确的军官证'
                        this.idCard1 = ''
                        return false
                    }else {
                        return true
                    }
                case '港澳回乡证或台胞证':
                    const reg4 = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
                    const reg5 = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
                    if (reg4.test(val) || reg5.test(val)) {
                        return true
                    }else {
                        this.errorIdCard1 = '请输入正确的港澳回乡证或台胞证'
                        this.idCard1 = ''
                        return false
                    }
            }
        },
        validatorPhone(val) {
            if (!val) {
                return false
            }
            if (/^1[3456789]\d{9}$/.test(val) == false) {
                this.errorPhone = '请填写正确的手机号'
                this.phone = ''
                return false
            }else {
                return true
            }
        },
        validatorPhone1(val) {
            if (!val) {
                return false
            }
            if (/^1[3456789]\d{9}$/.test(val) == false) {
                this.errorPhone1 = '请填写正确的手机号'
                this.phone1 = ''
                return false
            }else {
                return true
            }
        },
        validatorEmail(val) {
            if (!val) {
                return false
            }
            if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val) == false) {
                this.errorEmail = '请输入正确的邮箱'
                this.email = ''
                return false
            }else {
                return true
            }
        },
        validatorEmail1(val) {
            if (!val) {
                return false
            }
            if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(val) == false) {
                this.errorEmail1 = '请输入正确的邮箱'
                this.email1 = ''
                return false
            }else {
                return true
            }
        }
    },
}