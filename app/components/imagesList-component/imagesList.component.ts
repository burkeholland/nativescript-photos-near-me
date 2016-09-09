import { Component, OnInit, NgZone } from "@angular/core";
import { FlickrService } from "../../services/flickr.service";
import { PhotosSearchResponse } from "../../models/photosSearchResponse";
import { RouterExtensions } from "nativescript-angular/router";
import { Router, NavigationEnd} from "@angular/router";
import { GeolocationService } from "../../services/geolocation.service";
import { Observable } from "rxjs/Observable";
import { Config } from "../../config";

var mapbox = require("nativescript-mapbox");

@Component({
    selector: "ImagesListComponent",
    templateUrl: "components/imagesList-component/imagesList.component.html",
    providers: [ FlickrService, GeolocationService ]
})
export class ImagesListComponent implements OnInit {
    
    photos: PhotosSearchResponse[];
    progress: number = 0;

    constructor(private flickrService: FlickrService, private routerExtensions: RouterExtensions, private geolocationService: GeolocationService, private zone: NgZone, private router: Router) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url == "/") {
                    mapbox.unhide();
                }
            }
        });
     }

    ngOnInit() {
        this.geolocationService.getLocation().then(() => {
            this.loadPhotos().subscribe(
                photos => {
                    this.photos = photos.map((photo) => {
                        photo.distance = this.geolocationService.getDistanceFrom(photo.latitude, photo.longitude);  
                        return photo;
                    });

                    this.loadMap();
                    this.dropMarkers();
                },
                error => console.log(error));
            });
    }

    loadMap() {
        mapbox.show({
            accessToken: Config.MapBox.ACCESS_TOKEN,
            style: mapbox.MapStyle.OUTDOORS,
            hideLogo: true,
            showUserLocation: true,
            margins: {
                top: 365
            },
            center: {
                lat: this.geolocationService.latitude,
                lng: this.geolocationService.longitude
            },
            zoomLevel: 17
        });
    }

    dropMarkers() {
        let markers = this.photos.map((photo: PhotosSearchResponse, index: number) => {
            return {
                lat: photo.latitude,
                lng: photo.longitude,
                onTap: () => {
                    // the maps appear to be "always on top". we have to hide them
                    // in order for the next view to even appear. is this the only way?"
                    this.zone.run(() => {
                        this.showPhoto({ index: index });
                    });
                }
            }
        });

        mapbox.addMarkers(markers);
    }

    centerMap(args: any) {
        let photo = this.photos[args.index];
        mapbox.setCenter({
            lat: photo.latitude,
            lng: photo.longitude,
            animated: true
        });
    }

    showPhoto(args: any) {
        let photo = this.photos[args.index];
        mapbox.hide();
        this.routerExtensions.navigate([`/image-component/${photo.id}/${photo.owner}`]);
    }

    loadPhotos() {
        return this.flickrService.photosSearch(this.geolocationService.latitude, this.geolocationService.longitude);
    }
}


