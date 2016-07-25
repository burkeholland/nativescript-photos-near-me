import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {Instagram} from "../../config";
var url = require("url");  

@Component({
    selector: "AuthComponent",
    template: "<WebView url='{{ authUrl }}' #webview (loadStarted)='loadStarted(webview)' width='*' height='*'></WebView>"
})
export class AuthComponent {
    authUrl: string = `${Instagram.authURL}?client_id=${Instagram.clientId}&redirect_uri=${Instagram.redirectUri}&response_type=token` 

    constructor(private router: Router, private http: Http) {}

    loadStarted(arg) {
        if (arg.url.indexOf(`access_token`) > 0) {
            Instagram.accessToken = url.parse(arg.url).hash.substring(1).split('=')[1];
            this.router.navigate(["/map"]);
        }
    }
}