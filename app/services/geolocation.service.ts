import { Injectable } from "@angular/core";
var geolocation = require("nativescript-geolocation");
var humanizeDistance = require("humanize-distance");

@Injectable()
export class GeolocationService {

    public latitude: number;
    public longitude: number;

    public getLocation(): Promise<any> {
        return new Promise(
            (resolve, reject) => {
                if (!geolocation.isEnabled()) {
                    geolocation.enableLocationRequest().then(() => {
                        resolve(this._getCurrentLocation());
                    });
                }
                else {
                    resolve(this._getCurrentLocation());
                }
            }
        );
    }

    public getDistanceFrom(latitude: number, longitude: number): string {
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
        );
    }

}