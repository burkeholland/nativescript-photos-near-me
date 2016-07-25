"use strict";
var appSettings = require("application-settings");
var Instagram = (function () {
    function Instagram() {
    }
    Object.defineProperty(Instagram, "accessToken", {
        get: function () {
            return appSettings.getString("instagram.accessToken");
        },
        set: function (value) {
            appSettings.setString("instagram.accessToken", value);
        },
        enumerable: true,
        configurable: true
    });
    Instagram.authURL = "https://api.instagram.com/oauth/authorize/";
    Instagram.clientId = "0e6bcfc1643a41a38abaf2cd17d884dc";
    Instagram.clientSecret = "f7dddd2d0e1143cdb89de7932c506443";
    Instagram.redirectUri = "https://www.ng-book.com";
    return Instagram;
}());
exports.Instagram = Instagram;
//# sourceMappingURL=config.js.map