/// Saves cookies for email and password if user clickes on "remember me".
export const saveCookie = (cookieName, cookieValue) => {
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();

    document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

/// Gets a cookie value if exists.
export const getCookie = (cookieName) => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");

        const name = cookie[0].trim();

        if (name === cookieName) {
            return cookie[1];
        }
    }
    return null;
}