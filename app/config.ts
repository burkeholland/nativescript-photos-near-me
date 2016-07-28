// import * as appSettings from "application-settings";

export class Instagram {
    static authURL: string = "https://api.instagram.com/oauth/authorize/";
    static clientId: string = "0e6bcfc1643a41a38abaf2cd17d884dc";
    static clientSecret: string = "f7dddd2d0e1143cdb89de7932c506443";
    static redirectUri: string = "https://www.ng-book.com";

    static set accessToken(value) {
        // appSettings.setString("instagram.accessToken", value);
    } 

    static get accessToken(): string {
        return null;
        // return appSettings.getString("instagram.accessToken");
    }
}

export class Flickr {
    static clientId: string = "b8241dc9b98813054de12ebfc7784321";
    static apiUrl: string = "https://api.flickr.com/services/rest/?";
}