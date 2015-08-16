/**
 * Created by rreyes on 7/24/15.
 */
var Cookie = (function () {
    var pub = {};
    pub.set = function (name, value, minutes) {
        var date, expires;
        var enName, enValue;
        if (minutes) {
            date = new Date();
            date.setMinutes(date.getMinutes() + minutes);
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        enName = encodeURIComponent(name);
        enValue = encodeURIComponent(value);
        document.cookie = enName + "=" + enValue + expires + "; path=/";
    };

    pub.get = function (name) {
        var nameEq, cookies, cookie, i;
        var encode = encodeURIComponent(name);
        nameEq = encode + "=";
        cookies = document.cookie.split(";");
        for (i = 0; i < cookies.length; i += 1) {
            cookie = cookies[i].trim();
            if (cookie.indexOf(nameEq) === 0) {
                return decodeURIComponent(cookie.substring(nameEq.length, cookie.length));
            }
        }
        return null;
    };

    pub.clear = function (name) {
        pub.set(name, "", -1);
    };
    return pub;

}());

if (window.addEventListener) {
    window.addEventListener('load', Cookie.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', Cookie.setup);
} else {
    alert("Could not attach ’Cookie.setup’ to the ’window.onload’ event");
}