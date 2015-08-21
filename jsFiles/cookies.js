/**
 * Created by rreyes on 7/24/15.
 *
 * Utility functions for getting/setting Cookies.
 */

/*jslint browser: true, for: true */

/**
 * Module pattern for Cookie functions
 */
var Cookie = (function () {
    "use strict";
    var pub = {};

    /**
     * Set (or reset) a cookie value
     *
     * Cookies may be set to expire after a given number of hours.
     * If no expiry time is given, they expire when the browser closes.
     *
     * @param name The name of the cookie to store
     * @param value The value to store in the cookie
     * @param hours [optional] time (in hours) until the cookie expires
     */
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

    /**
     * Retrieve a cookie value
     *
     * @param name The name of the cookie to retrieve
     * @return The value of the cookie, or null if not set
     */
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

    /**
     * Clear a cookie value
     *
     * @param name The name of the cookie to clear
     */
    pub.clear = function (name) {
        pub.set(name, "", -1);
    };
    return pub;

}());
