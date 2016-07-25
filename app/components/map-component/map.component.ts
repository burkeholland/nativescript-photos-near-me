import {Component, OnInit} from "@angular/core";
import {topmost} from "ui/frame";
import {Page} from "ui/page";
var mapbox = require("nativescript-mapbox");
var geolocation = require("nativescript-geolocation");
import {InstagramService} from "../../services/instagram.service";

@Component({
    selector: "MapComponent",
    template: "<StackLayout></StackLayout>",
    providers: [InstagramService]
})
export class MapComponent implements OnInit {
    
    latitude: number = 0;
    longitude: number = 0;

    constructor(private instagramService: InstagramService) {
        
        // make sure we've got location permissions
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }

        geolocation.getCurrentLocation()
        .then((location) => {
            this.latitude = location.latitude;
            this.longitude = location.longitude;

            this.showMap();

            this.centerMap().then(() => {
                setTimeout(() => {
                    instagramService.search(this.latitude, this.longitude);
                }, 1000);
            });
        });
    }

    ngOnInit() {
        let page = <Page>topmost().currentPage;
        page.actionBarHidden = true;
    }

    showMap() {
        mapbox.show({
            accessToken: "sk.eyJ1IjoiYnVya2Vob2xsYW5kIiwiYSI6ImNpcXh3NXd3NDAxcDJmbG04M2FxNW5zc3YifQ.kVNHOX6UvgsTPS4BJebtLg",
            style: mapbox.MapStyle.OUTDOORS,
            hideLogo: true,
            hideCmopass: true,
            showUserLocation: true,
            zoomLevel: 10
        });
    }

    centerMap() {

        console.log(`centering map on lat: ${this.latitude} and lng:${this.longitude}`)

        return mapbox.setCenter({
            lat: this.latitude,
            lng: this.longitude
        });
    }

    addMarkers() {

        let cats: Array<any> = [
            { lat: 35.9240970, lng: -86.8715860, iconPath: "http://placekitten.com/25", title: "Starbucks", subtitle: "Coffee" },
             { lat: 35.9319340, lng: -86.8763220, iconPath: "http://placekitten.com/25", title: "CVS", subtitle: "Pharmacy" },
            { lat: 35.9464880, lng: -86.8798870, iconPath: "http://placekitten.com/25", title: "Casual Pint", subtitle: "Beer" }
        ]

        mapbox.addMarkers(cats );
    }
}
