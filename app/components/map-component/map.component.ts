import {Component, OnInit, NgZone, ElementRef, ViewChild} from "@angular/core";
import {topmost} from "ui/frame";
import {Page} from "ui/page";
var geolocation = require("nativescript-geolocation");
import {FlickrService} from "../../services/flickr.service";
import {Router, ActivatedRoute} from "@angular/router";
var mapbox = require("nativescript-mapbox");

const MAP_BOX_ACCESS_TOKEN: string = "sk.eyJ1IjoiYnVya2Vob2xsYW5kIiwiYSI6ImNpcXh3NXd3NDAxcDJmbG04M2FxNW5zc3YifQ.kVNHOX6UvgsTPS4BJebtLg";

@Component({
    selector: "MapComponent",
    providers: [FlickrService],
    template: "<StackLayout></StackLayout>"
})
export class MapComponent implements OnInit {

    latitude: number = 0;
    longitude: number = 0;

    constructor(private flickrService: FlickrService, private router: Router, private activatedRoute: ActivatedRoute, private zone: NgZone) {
        
    }

    ngOnInit() {
        let page = <Page>topmost().currentPage;

        // this is not good. this reloads the entire map and recenters it.
        page.addEventListener("navigatedTo", () => {
            mapbox.unhide();
        });

        // make sure we've got location permissions, then load the map
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest().then(() => {
                this.loadMapWithLocation();
            });
        }
        else {
            this.loadMapWithLocation();
        }
    }

    loadMapWithLocation() {
        geolocation.getCurrentLocation({ timeout: 20000 })
        .then((location) => {

            this.latitude = location.latitude;
            this.longitude = location.longitude;

            // drop a marker 

            this.showMap();
                
            this.flickrService.photosSearch(this.latitude, this.longitude)
                .then(data => {
                    // map flickr response to map box markers
                    let markers = data.map(element => {
                        return {
                            lat: element.latitude,
                            lng: element.longitude,
                            title: element.title,
                            onCalloutTap: () => {
                                // the maps appear to be "always on top". we have to hide them
                                // in order for the next view to even appear. is this the only way?"
                                this.zone.run(() => {
                                    mapbox.hide();
                                    this.router.navigate([`/images-list/${element.owner}`]);
                                });
                            }
                        }
                    });

                    this.addMarkers(markers);
                })
                .catch(error => console.log(`Error executing flickrService.photoSearch: ${error}`));
        });
    }

    showMap() {
        mapbox.show({
            accessToken: MAP_BOX_ACCESS_TOKEN,
            style: mapbox.MapStyle.OUTDOORS,
            hideLogo: true,
            showUserLocation: true,
            center: {
                lat: this.latitude,
                lng: this.longitude
            },
            zoomLevel: 18
        });
    }

    addMarkers(photos: any) {
        mapbox.addMarkers(photos);
    }
}
