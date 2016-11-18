// import { MapComponent } from "./components/map-component/map.component";
import { ImagesListComponent } from "./components/imagesList-component/imagesList.component";
import { ImageComponent } from "./components/image-component/image.component";

export const routes = [
  { path: "", component: ImagesListComponent },
  { path: "image-component/:photo_id/:user_id", component: ImageComponent },
  // { path: "map-component", component: MapComponent },
];

export const navigatableComponents = [
  ImagesListComponent,
  ImageComponent
];
