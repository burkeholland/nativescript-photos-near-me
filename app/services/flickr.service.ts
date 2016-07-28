import {Component, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Flickr} from "../config";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch'
import {FlickrResponseModel} from "../models/flickrResponse.model";

@Injectable()
export class FlickrService {
    
    constructor(private http: Http) {}

    // overloading methods in typescript is, um, interesting...
    photosSearch(userId: number): Observable<FlickrResponseModel[]>;
    photosSearch(lat: number, lon: number): Observable<FlickrResponseModel[]>;

    photosSearch(userIdOrLat: any, lon?: number): Observable<FlickrResponseModel[]> {
        let url = `${Flickr.apiUrl}method=flickr.photos.search&api_key=${Flickr.clientId}&content_type=1`;
        
        if (lon) {
            url = `${url}&lat=${userIdOrLat}&lon=${lon}&format=json&nojsoncallback=1&extras=url_t,geo`;
        }
        else {
            url = `${url}&user_id=${userIdOrLat}&format=json&nojsoncallback=1&extras=url_t`;
        }

        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response){
        let body = res.json();
        return body.photos.photo;
    }

    handleError(error: Response) {
        return Observable.throw(error);
    }
}