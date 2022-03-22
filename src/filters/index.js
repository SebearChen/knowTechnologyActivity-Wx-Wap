/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
/**
 * phone formatting
 * like 1380013800 => 138****3800
 * @param {String} phone
 */
export function phoneFormatter(phone='') {

  return `${phone.substring(0, 3)}*****${phone.substring(8)}`
}
/**
 * name formatting
 * like 张三 => 张**
 * @param {String} phone
 */
export function nameFormatter(name='') {

  if (name.length==1||!name) {
    return name
  }else if (name.length == 2) {
    return `${name.substring(0, 1)}*`
  }else if(name.length > 2) {
    return `${name.substring(0, 1)}${name.substring(2, name.length-1).replace(/.*/g, '*')}${name.substring(name.length-1)}`
  }
}

/**
 * date formatting
 * @param {String, number} val
 * @param {String} flag
 * @param {String, number} type
 * @param {String, number} lg
 */
export function formatTime(val, flag="/", type=1, lg="cn") {
    if (window.isNaN(val)) {
        return `${['0000', '00', '00'].join('.')} ${['00', '00'].join(':')}`
    }

    let _t = new Date(val),
        _y = _t.getFullYear(),
        _m = _t.getMonth() + 1,
        _d = _t.getDate(),
        _h = _t.getHours(), 
        _min = _t.getMinutes(),
        _ss = _t.getSeconds();

        _y = _y.toString().length==1?`0${_y}`:_y
        _m = _m.toString().length==1?`0${_m}`:_m
        _d = _d.toString().length==1?`0${_d}`:_d
        _h = _h.toString().length==1?`0${_h}`:_h
        _min = _min.toString().length==1?`0${_min}`:_min
        _ss = _ss.toString().length==1?`0${_ss}`:_ss
    
    if (type == 1) {
        return lg == 'cn' ? `${[_y ,_m, _d].join(flag)}` : `${[_d, _m, _y].join(flag)}`
    }
    else if (type == 2) {
        return lg == 'cn' ? `${[_y ,_m, _d].join(flag)} ${[_h ,_min ,_ss].join(":")}` : `${[_d, _m, _y].join(flag)} ${[_h ,_min ,_ss].join(":")}`
    }
    else if (type == 3) {
        return lg == 'cn' ? `${[_m, _d].join(flag)}` : `${[_d, _m].join(flag)}`
    }
    else if (type == 4) {
        return lg == 'cn' ? `${[_m, _d].join(flag)} ${[_h ,_min ,_ss].join(":")}` : `${[_d, _m].join(flag)} ${[_h ,_min ,_ss].join(":")}`
    }
    else if (type == 5) {
        return lg == 'cn' ? `${[_y ,_m, _d].join(flag)} ${[_h ,_min].join(":")}` : `${[_d, _m, _y].join(flag)} ${[_h ,_min ,_ss].join(":")}`
    }
    else if (type == 99) {
        return { _y, _m, _d, _h, _min, _ss}
    }
}
