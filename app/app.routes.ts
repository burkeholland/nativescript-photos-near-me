import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router";
import {AuthComponent} from "./components/auth-component/auth.component";
import {MapComponent} from "./components/map-component/map.component";
import {ImagesListComponent} from "./components/imagesList-component/imagesList.component";

export const routes: RouterConfig = [
  { path: "", component: MapComponent},
  { path: "map", component: MapComponent },
  { path: "images-list/:user_id", component: ImagesListComponent }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];