export const getCookie = (name) => {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export const setCookie = (name, value, days) => {
    var d = new Date();
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

export const authenticatedUser = () => {
    return Boolean(getCookie('token'))
}

export const deleteCookie = (name) => { setCookie(name, '', -1); }

