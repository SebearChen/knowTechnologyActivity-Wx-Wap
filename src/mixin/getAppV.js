import { getUrlQuery } from "@utils"

export default {
    methods: {
        getAppV() {
            try {
                if (window.PCJSKit) {
                    let _v = window.PCJSKit.appVer()
                    return _v ? _v.split('.') : false;
                } else {
                    let _v = getUrlQuery('FromPCapp')

                    if (!_v) {
                        return false
                    } else {
                        _v = _v.split('_')
                        _v = _v[_v.length - 1]
                        return _v ? _v.split('.') : false;
                    }
                }
            } catch (e) {
                console.warn(e)
                return false
            }
        },
        isBetterApp(v) {
            try {
                let _ov = v ? v.split('.') : []
                let _nv = this.getAppV()
                return _nv[0] > _ov[0] ? true : _nv[0] < _ov[0] ? false : _nv[1] > _ov[1] ? true : _nv[1] < _ov[1] ? false : parseInt(_nv[2]) >= parseInt(_ov[2]) ? true : false
            } catch (e) {
                console.warn(e)
                return false
            }
        }
    },
}