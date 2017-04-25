export function _debounce (func, wait) {
    let _timestamp, _timer
    return function () {
        let now = Date.now()
        if (_timestamp && ((now - _timestamp) < wait)) {
            clearTimeout(_timer)
        }
        _timestamp = now
        _timer = setTimeout(func.bind(this, ...arguments), wait)
    }
}
