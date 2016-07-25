"use strict";
var router_1 = require("nativescript-angular/router");
var auth_component_1 = require("./components/auth-component/auth.component");
var map_component_1 = require("./components/map-component/map.component");
var imagesList_component_1 = require("./components/imagesList-component/imagesList.component");
var auth_guard_1 = require("./auth.guard");
exports.routes = [
    { path: "", component: auth_component_1.AuthComponent },
    { path: "map", component: map_component_1.MapComponent },
    { path: "images-list", component: imagesList_component_1.ImagesListComponent }
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.nsProvideRouter(exports.routes, { enableTracing: false }),
    auth_guard_1.AuthGuard
];
//# sourceMappingURL=app.routes.js.map