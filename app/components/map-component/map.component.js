"use strict";
var core_1 = require("@angular/core");
var frame_1 = require("ui/frame");
var mapbox = require("nativescript-mapbox");
var geolocation = require("nativescript-geolocation");
var instagram_service_1 = require("../../services/instagram.service");
var MapComponent = (function () {
    function MapComponent(instagramService) {
        var _this = this;
        this.instagramService = instagramService;
        this.latitude = 0;
        this.longitude = 0;
        // make sure we've got location permissions
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
        geolocation.getCurrentLocation()
            .then(function (location) {
            _this.latitude = location.latitude;
            _this.longitude = location.longitude;
            _this.showMap();
            _this.centerMap().then(function () {
                setTimeout(function () {
                    instagramService.search(_this.latitude, _this.longitude);
                }, 1000);
            });
        });
    }
    MapComponent.prototype.ngOnInit = function () {
        var page = frame_1.topmost().currentPage;
        page.actionBarHidden = true;
    };
    MapComponent.prototype.showMap = function () {
        mapbox.show({
            accessToken: "sk.eyJ1IjoiYnVya2Vob2xsYW5kIiwiYSI6ImNpcXh3NXd3NDAxcDJmbG04M2FxNW5zc3YifQ.kVNHOX6UvgsTPS4BJebtLg",
            style: mapbox.MapStyle.OUTDOORS,
            hideLogo: true,
            hideCmopass: true,
            showUserLocation: true,
            zoomLevel: 10
        });
    };
    MapComponent.prototype.centerMap = function () {
        console.log("centering map on lat: " + this.latitude + " and lng:" + this.longitude);
        return mapbox.setCenter({
            lat: this.latitude,
            lng: this.longitude
        });
    };
    MapComponent.prototype.addMarkers = function () {
        var cats = [
            { lat: 35.9240970, lng: -86.8715860, iconPath: "http://placekitten.com/25", title: "Starbucks", subtitle: "Coffee" },
            { lat: 35.9319340, lng: -86.8763220, iconPath: "http://placekitten.com/25", title: "CVS", subtitle: "Pharmacy" },
            { lat: 35.9464880, lng: -86.8798870, iconPath: "http://placekitten.com/25", title: "Casual Pint", subtitle: "Beer" }
        ];
        mapbox.addMarkers(cats);
    };
    MapComponent = __decorate([
        core_1.Component({
            selector: "MapComponent",
            template: "<StackLayout></StackLayout>",
            providers: [instagram_service_1.InstagramService]
        }), 
        __metadata('design:paramtypes', [instagram_service_1.InstagramService])
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=map.component.js.map