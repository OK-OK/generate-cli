export function getParams(str, url = window.location.href) {
    const obj = {};
    if (!url.includes('?')) return;
    url.substring(url.lastIndexOf('?') + 1).split('&').forEach(it => {
        const arr = it.split('=');
        obj[arr[0]] = arr[1] || '';
    })
    return str ? obj[str] : obj;
}

// 防抖
export function debounce(fn, wait = 800) {
    var timer = null;
    return function () {
        var context = this
        var args = arguments
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, wait)
    }
}