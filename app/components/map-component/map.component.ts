import {Component, OnInit, NgZone} from "@angular/core";
import {topmost} from "ui/frame";
import {Page} from "ui/page";
var mapbox = require("nativescript-mapbox");
var geolocation = require("nativescript-geolocation");
import {FlickrService} from "../../services/flickr.service";
import {MapBoxMarker} from "../../models/mapBoxMarker.model";
import {Router, ActivatedRoute} from "@angular/router";

const MAP_BOX_ACCESS_TOKEN: string = "sk.eyJ1IjoiYnVya2Vob2xsYW5kIiwiYSI6ImNpcXh3NXd3NDAxcDJmbG04M2FxNW5zc3YifQ.kVNHOX6UvgsTPS4BJebtLg" 

@Component({
    selector: "MapComponent",
    template: "<StackLayout></StackLayout>",
    providers: [FlickrService]
})
export class MapComponent implements OnInit {
    
    navigate() {
        this.router.navigate(['/images-list/1']);
    }

    latitude: number = 0;
    longitude: number = 0;

    constructor(private flickrService: FlickrService, private router: Router, private activatedRoute: ActivatedRoute, private zone: NgZone) {
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

    ngOnInit() {
        let page = <Page>topmost().currentPage;

        // this is not good. this reloads the entire map and recenters it.
        page.addEventListener("navigatedTo", () => {
            this.loadMapWithLocation();
        })
    }

    loadMapWithLocation() {
        geolocation.getCurrentLocation({ timeout: 20000 })
        .then((location) => {

            this.latitude = location.latitude;
            this.longitude = location.longitude;

            this.showMap();
                
            this.flickrService.photosSearch(this.latitude, this.longitude)
                .then(data => {
                    // map flickr response to map box markers
                    let markers = data.map(element => {
                        let marker = new MapBoxMarker();
                        marker.id = element.id;
                        marker.owner = element.owner;
                        marker.lat = element.latitude;
                        marker.lng = element.longitude;
                        marker.title = element.title;
                        marker.thumbnail = element.url_t;

                        marker.onCalloutTap = () => {
                            // the maps appear to be "always on top". we have to hide them
                            // in order for the next view to even appear. is this the only way?"
                            this.zone.run(() => {
                                mapbox.hide();
                                this.router.navigate([`/images-list/${marker.owner}`]);
                            });
                        }

                        return marker;
                    });

                    this.addMarkers(markers);
                })
                .catch(error => console.log(`Error executing flickrService.photSearch: ${error}`));
        });
    }

    showMap() {
        mapbox.show({
            accessToken: MAP_BOX_ACCESS_TOKEN,
            style: mapbox.MapStyle.OUTDOORS,
            hideLogo: true,
            hideCmopass: true,
            showUserLocation: true,
            margins: {
                top: 100
            },
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
