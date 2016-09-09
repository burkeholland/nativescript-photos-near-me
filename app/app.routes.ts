import {RouterConfig} from "@angular/router";
import {nsProvideRouter} from "nativescript-angular/router";
import {MapComponent} from "./components/map-component/map.component";
import {ImagesListComponent} from "./components/imagesList-component/imagesList.component";
import {ImageComponent} from "./components/image-component/image.component";

export const routes: RouterConfig = [
  { path: "", component: ImagesListComponent },
  { path: "map-component", component: MapComponent },
  { path: "image-component/:photo_id/:user_id", component: ImageComponent }
];

export const APP_ROUTER_PROVIDERS = [
  nsProvideRouter(routes, {})
];