import {Component, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Flickr} from "../config";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch'

import {FlickrUserInfoModel} from '../models/flickr.userInfo';

@Injectable()
export class FlickrService {

    constructor(private http: Http) {}

    // overloading methods in typescript is, um, interesting...
    photosSearch(userId: string);
    photosSearch(lat: number, lon: number);

    photosSearch(userIdOrLat: any, lon?: number) {
        let url = `${Flickr.apiUrl}method=flickr.photos.search&api_key=${Flickr.clientId}&content_type=1`;
        
        if (lon) {
            url = `${url}&lat=${userIdOrLat}&lon=${lon}&format=json&nojsoncallback=1&extras=url_t,geo`;
        }
        else {
            url = `${url}&user_id=${userIdOrLat}&format=json&nojsoncallback=1&extras=url_n`;
        }

        return new Promise(resolve => { 
            this.http.get(url)
            .toPromise()
            .then(response => resolve(response.json().photos.photo)) 
            .catch(this.handleError);
        });
    }

    handleError(error: Response) {
        console.log(error);
    }

    getUserInfo(userId: string) {
        let url = `${Flickr.apiUrl}method=flickr.people.getInfo&api_key=${Flickr.clientId}&user_id=${userId}&format=json&nojsoncallback=1`;
        return new Promise(resolve => {
            this.http.get(url)
                .toPromise()
                .then(response => {
                    let person = response.json().person;
                    let userInfo = new FlickrUserInfoModel();

                    userInfo.realname = person.realname._content;
                    userInfo.username = person.username._content;
                    userInfo.location = person.location._content;
                    userInfo.firstdatetaken = person.photos.firstdatetaken._content;
                    
                    resolve(userInfo);
                })
                .catch(this.handleError);
        });
    }
}