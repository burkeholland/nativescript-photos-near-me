import {Component, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Instagram} from "../config";

@Injectable()
export class InstagramService {
 
    url: string = "https://api.instagram.com/v1/media/search"

    constructor(private http: Http) {

    }

    search(lat: number, lng: number) {
        this.http.get(`${this.url}?lat=${lat}&lng=${lng}&access_token=${Instagram.accessToken}`)
            .map(this.extractData)
            .subscribe(
                data => console.log(data),
                err => console.log(err)
            );
    }

    private extractData(res: Response) {
        console.log(res.text);
    }

    private handleError() {

    }
}