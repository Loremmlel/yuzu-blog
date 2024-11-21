/**
 * 节流，限制事件的执行频率，确保某个事件在一定时间内只会触发一次，无论该事件触发了多少次。
 */
export function throttle(fn: Function, wait: number) {
    let lastTime = 0
    return function () {
        const now = new Date().getTime()
        if (now - lastTime >= wait) {
            fn()
            lastTime = now
        }
    }
}

/**
 * 防抖，在某个事件触发后的一段时间内只执行一次，并且如果在这段时间内事件被再次触发，之前的执行会被取消，重新计时。
 */
export function debounce(fn: Function, delay: number) {
    let timer: any = null
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}