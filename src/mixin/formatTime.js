
export default {
    methods: {
        formatTime(val, flag="/", type=1, lg="cn") {
            let _t = new Date(val),
                _y = _t.getFullYear(),
                _m = _t.getMonth() + 1,
                _d = _t.getDate(),
                _h = _t.getHours(), 
                _min = _t.getMinutes(),
                _ss = _t.getSeconds(),
                _val;

                _y = _y.toString().length==1?`0${_y}`:_y
                _m = _m.toString().length==1?`0${_m}`:_m
                _d = _d.toString().length==1?`0${_d}`:_d
                _h = _h.toString().length==1?`0${_h}`:_h
                _min = _min.toString().length==1?`0${_min}`:_min
                _ss = _ss.toString().length==1?`0${_ss}`:_ss
            
            if (type == 1) {
                return lg == 'cn' ? `${[_y ,_m, _d].join(flag)}` : `${[_d, _m, _y].join(flag)}`
            }else if (type == 2) {
                return lg == 'cn' ? `${[_y ,_m, _d].join(flag)} ${[_h ,_min ,_ss].join(":")}` : `${[_d, _m, _y].join(flag)} ${[_h ,_min ,_ss].join(":")}`
            }else if (type == 3) {
                return lg == 'cn' ? `${[_m, _d].join(flag)}` : `${[_d, _m].join(flag)}`
            }else if (type == 4) {
                return lg == 'cn' ? `${[_m, _d].join(flag)} ${[_h ,_min ,_ss].join(":")}` : `${[_d, _m].join(flag)} ${[_h ,_min ,_ss].join(":")}`
            }else if (type == 5) {
                return lg == 'cn' ? `${[_y ,_m, _d].join(flag)} ${[_h ,_min].join(":")}` : `${[_d, _m, _y].join(flag)} ${[_h ,_min ,_ss].join(":")}`
            }else if (type == 99) {
                return {
                    _y,
                    _m,
                    _d,
                    _h,
                    _min,
                    _ss
                }
            }
        },
        countTime(val) {
            if (typeof val != 'number') {
                return { day: '00', hour: '00', min: '00', second: '00'}
            }
            
            var allDay = Math.floor(val / 86400);
            var year = Math.floor(val / 86400 / 365);
            val = val % (86400 * 365);
            var month = Math.floor(val / 86400 / 30);
            val = val % (86400 * 30);
            var day = Math.floor(val / 86400);
            val = val % 86400;
            var hour = Math.floor(val / 3600);
            val = val % 3600;
            var min = Math.floor(val / 60);
            val = val % 60;
            var second = val;
            
            return {
                year: year.toString().length==1 ? `0${year}`:year,
                month: month.toString().length==1 ? `0${month}`:month,
                day: day.toString().length==1 ? `${day}`:day,
                allDay,
                hour: hour.toString().length==1 ? `0${hour}`:hour,
                min: min.toString().length==1 ? `0${min}`:min,
                second: second.toString().length==1 ? `0${second}`:second
            }
        }
    },
}