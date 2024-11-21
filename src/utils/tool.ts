export const Base64 = {
    encode: (v: string) => {
        return window.btoa(window.encodeURIComponent(v))
    },
    decode: (v: string) => {
        return window.decodeURIComponent(window.atob(v))
    }
}

export function _setLocalItem(key: string, value: any) {
    try {
        if (key === "" || key == null) {
            return
        }
        if (value == 0) {
            value = JSON.stringify(value)
            localStorage.setItem(Base64.encode(key))
        }
        if (value == null || value === "") {
            return
        }
        const enObj = JSON.stringify(value)
        localStorage.setItem(Base64.encode(key), Base64.encode(enObj))
    } catch (err) {
        console.error(err)
    }
}

export function _getLocalItem(key: string) {
    try {
        if (key == null || key === "") {
            return null
        }
        let value = localStorage.getItem(Base64.encode(key))
        if (value == null || value === "") {
            return null
        } else {
            value = Base64.decode(value)
            return JSON.parse(value)
        }
    } catch (err) {
        console.error(err)
    }
}

export function _setSessionItem(key: string, value: any) {
    try {
        if (key === "" || key == null) {
            return
        }
        if (value == 0) {
            value = JSON.stringify(value)
            sessionStorage.setItem(Base64.encode(key), value)
        }
        if (value == null || value === "") {
            return
        }
        let enObj = JSON.stringify(value);
        sessionStorage.setItem(Base64.encode(key), Base64.encode(enObj))

    } catch (e) {
        console.log(e);
        return sessionStorage.setItem(Base64.encode(key))
    }
}

export function _getSessionItem(key: string) {
    if (key == null || key === "") {
        return null
    }
    try {
        let value = sessionStorage.getItem(Base64.encode(key))
        if (value == null || value === "") {
            return value;
        } else {
            value = Base64.decode(value)
            return JSON.parse(value);
        }
    } catch (e) {
        console.log(e);
        return sessionStorage.getItem(Base64.encode(key))
    }
}

export function _removeLocalItem(key: string) {
    if (key == null || key === "") {
        return
    }
    localStorage.removeItem(Base64.encode(key))
}

export function _removeSessionItem(key: string) {
    if (key == null || key === "") {
        return
    }
    sessionStorage.removeItem(Base64.encode(key))
}

export function deepClone(source: object): any {
    if (!source && typeof source !== "object") {
        throw new Error("参数错误")
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === "object") {
            targetObj[key] = deepClone(source[key])
        } else {
            targetObj[key] = source[key]
        }
    })
    return targetObj
}

export function isMobile() {
    const reg = /(phone|pad|iPhone|iPod|ios|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    return reg.test(navigator.userAgent)
}

export function randomFontColor() {
    return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)},
    ${Math.round(Math.random() * 255)})`
}

export function numberFormat(number: number | string): string {
    if (!number) return "0"
    number = typeof number === "number" ? number : parseFloat(number)
    let res: string
    if (number >= 10000) {
        res = (number / 10000).toFixed(1) + "w"
    } else if (number >= 1000) {
        res = (number / 1000).toFixed(1) + "k"
    } else {
        res = number
    }
    return res
}

/**
 * 根据时间欢迎
 */
export function getWelcomeSay(nickName: string): string {
    let res: string
    if (!nickName) {
        res = "欢迎来到柚子的个人博客"
        return res
    }
    const now = new Date().getHours()
    if (now >= 0 && now < 5) {
        res = `夜深了: ${nickName}, 再不休息别猝死了🤣`
    } else if (now >= 5 && now < 9) {
        res = `早上好: ${nickName}, 今天有个好心情吗😊`
    } else if (now >= 9 && now < 12) {
        res = `上午好: ${nickName}, 请合理安排时间摸鱼🧐`
    } else if (now >= 12 && now < 14) {
        res = `中午好: ${nickName}, 午饭吃饱了吗😋`
    } else if (now >= 14 && now < 18) {
        res = `下午好: ${nickName}, 快下班了~`
    } else if (now >= 18 && now < 24) {
        res = `晚上好: ${nickName}, 休息一下吧☕`
    } else {
        res = "欢迎来到柚子的个人博客"
    }
    return res
}

export function containHTML(text: string): boolean {
    const reg = /<[^>]+>/g
    const badJs = /script|alert|window|prompt|location|href|iframe|onload|onerror/g
    return reg.test(text) && !badJs.test(text)
}

export function filterMessage(text: string): string {
    return text.replace(/&gt;/g, ">").replace(/&lt;/g, "<")
}

export function returnTime(time: string): string {
    if (!time) return
    time = time.replace(/-/g, "/")
    let times = new Date().getTime() - new Date(time).getTime()
    let res
    if (times < 6e4) {
        res = Math.trunc(times / 1000) + "秒"
    } else if (times < 36e5) {
        res = Math.trunc(times / 6e4) + "分钟"
    } else if (times < 864e5) {
        res = Math.trunc(times / 36e5) + "小时"
    } else if (times < 2592e6) {
        res = Math.trunc(times / 864e5) + "天"
    } else if (times < 31536e6) {
        res = Math.trunc(times / 2592e6) + "月"
    } else {
        res = Math.trunc(times / 31536e6) + "年"
    }
    return res
}

/**
 * 压缩图片
 */
export function imageConversion(file: Blob, size: number = 800, quality: number = 1, maxTime: number = 3) {
    return new Promise((resolve) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                const image = new Image()
                image.src = e.target.result
                image.onload = () => {
                    const canvas = document.createElement("canvas")
                    const context = canvas.getContext("2d")
                    const width = image.width
                    const height = image.height
                    canvas.width = width
                    canvas.height = height
                    context.drawImage(image, 0, 0, width, height)
                    let dataUrl = canvas.toDataURL(file.type, quality)
                    while (maxTime && quality > 0.2) {
                        if (Math.round(dataUrl.length) / 1024 > size) {
                            maxTime--
                            quality -= 0.2
                            dataUrl = canvas.toDataURL(file.type, quality)
                        } else {
                            break
                        }
                    }
                    const arr = dataUrl.split(",")
                    let mime = arr[0].match(/:(.*?);/)[1]
                    const bStr = atob(arr[1])
                    let n = bStr.length
                    const u8Arr = new Uint8Array(n)
                    while (n--) {
                        u8Arr[n] = bStr.charCodeAt(n)
                    }
                    mime = file.type
                    resolve(new Blob([u8Arr], {type: mime}))
                }
            }
        } catch (e) {
            console.error(e)
        }
    })
}