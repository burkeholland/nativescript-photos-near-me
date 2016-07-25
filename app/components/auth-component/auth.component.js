"use strict";
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var config_1 = require("../../config");
var url = require("url");
var AuthComponent = (function () {
    function AuthComponent(router, http) {
        this.router = router;
        this.http = http;
        this.authUrl = config_1.Instagram.authURL + "?client_id=" + config_1.Instagram.clientId + "&redirect_uri=" + config_1.Instagram.redirectUri + "&response_type=token";
    }
    AuthComponent.prototype.loadStarted = function (arg) {
        if (arg.url.indexOf("access_token") > 0) {
            config_1.Instagram.accessToken = url.parse(arg.url).hash.substring(1).split('=')[1];
            this.router.navigate(["/map"]);
        }
    };
    AuthComponent = __decorate([
        core_1.Component({
            selector: "AuthComponent",
            template: "<WebView url='{{ authUrl }}' #webview (loadStarted)='loadStarted(webview)' width='*' height='*'></WebView>"
        }), 
        __metadata('design:paramtypes', [router_1.Router, http_1.Http])
    ], AuthComponent);
    return AuthComponent;
}());
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map