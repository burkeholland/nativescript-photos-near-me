import { Injectable } from "@angular/core";
let geolocation = require("nativescript-geolocation");
let humanizeDistance = require("humanize-distance");

@Injectable()
export class GeolocationService {

    latitude: number;
    longitude: number;

    getLocation(): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                // make sure we've got location permissions, then load the map
                if (!geolocation.isEnabled()) {
                    geolocation.enableLocationRequest().then(() => {
                        resolve(this._getCurrentLocation());
                    });
                }
                else {
                    resolve(this._getCurrentLocation());
                }
            }
        )
    }

    getDistanceFrom(latitude: number, longitude: number): string {
        return humanizeDistance({ latitude: latitude, longitude: longitude }, { latitude: this.latitude, longitude: this.longitude }, 'en-US', 'us');
    }

    private _getCurrentLocation(): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                geolocation.getCurrentLocation({ timeout: 20000 })
                .then(location => {

                    this.latitude = location.latitude;
                    this.longitude = location.longitude;

                    resolve();
                })
                .catch(error => {
                    reject(error);
                })
            }
        )
        
    }
}