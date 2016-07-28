import {Component, Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Instagram} from "../config";

@Injectable()
export class InstagramService {
 
    url: string = "https://api.instagram.com/v1/media/search"

    constructor(private http: Http) {

    }

    search(lat: number, lng: number) {

        var url = `${this.url}?lat=${lat}&lng=${lng}&access_token=${Instagram.accessToken}&distance=5000`;

        console.log(`Search Request: ${url}`);

        this.http.get(url)
            .map(this.extractData)
            .subscribe(
                err => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
    }

    private extractData(res: Response) {
        console.log(res.json());
    }

    private handleError() {

    }
}