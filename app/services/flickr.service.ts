import { Component, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Config } from "../config";
import { PhotosSearchResponse } from "../models/photosSearchResponse";
import { GetInfoResponse } from '../models/getInfoResponse';

@Injectable()
export class FlickrService {

    constructor(private http: Http) {}

    photosSearch(lat: number, lon: number): Observable<PhotosSearchResponse[]> {
        let url = `${Config.Flickr.API_URL}method=flickr.photos.search&api_key=${Config.Flickr.CLIENT_ID}&content_type=1&lat=${lat}&lon=${lon}&extras=url_q,geo&format=json&nojsoncallback=1`;
        
        return this.http.get(url)
            .map(response => { return response.json().photos.photo })
            .catch(this.handleError);
    }

    getPhotoInfo(photoId: number): Observable<GetInfoResponse> {
        let url = `${Config.Flickr.API_URL}method=flickr.photos.getInfo&api_key=${Config.Flickr.CLIENT_ID}&photo_id=${photoId}&format=json&nojsoncallback=1`;

        return this.http.get(url)
            .map(response => { 
                let photo = response.json().photo;
                return photo; 
            })
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}