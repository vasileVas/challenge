export const getCookie = (name) => {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

export const setCookie = (name, value, hours) => {
    var d = new Date();
    d.setTime(d.getTime() + 60*60*1000*hours);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

export const authenticatedUser = () => {
    return Boolean(getCookie('token'))
}

export const authenticateUser = (token, refreshToken) => {
    setCookie('token', token, 1);
    const weekHours = 24 * 7;
    setCookie('refreshToken', refreshToken, weekHours);
}

export const logoutUser = () => {
    deleteCookie('token');
    deleteCookie('refreshToken');
}

export const deleteCookie = (name) => { setCookie(name, '', -1); }

