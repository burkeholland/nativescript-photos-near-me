"use strict";
var core_1 = require("@angular/core");
var router_1 = require('@angular/router');
var config_1 = require("./config");
var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (config_1.Instagram.accessToken) {
            this.router.navigate(["/"]);
            return true;
        }
        else {
            this.router.navigate(["/"]);
            return false;
        }
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map