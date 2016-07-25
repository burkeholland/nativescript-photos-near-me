"use strict";
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var config_1 = require("../config");
var InstagramService = (function () {
    function InstagramService(http) {
        this.http = http;
        this.url = "https://api.instagram.com/v1/media/search";
    }
    InstagramService.prototype.search = function (lat, lng) {
        this.http.get(this.url + "?lat=" + lat + "&lng=" + lng + "&access_token=" + config_1.Instagram.accessToken)
            .map(this.extractData)
            .subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); });
    };
    InstagramService.prototype.extractData = function (res) {
        console.log(res.text);
    };
    InstagramService.prototype.handleError = function () {
    };
    InstagramService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], InstagramService);
    return InstagramService;
}());
exports.InstagramService = InstagramService;
//# sourceMappingURL=instagram.service.js.map