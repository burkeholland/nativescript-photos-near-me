import {Component, OnInit, NgZone} from "@angular/core";
import {FlickrService} from "../../services/flickr.service";
import {ActivatedRoute} from "@angular/router";
import {FlickrPhotosSearchModel} from "../../models/flickr.photosSearch";
import {FlickrUserInfoModel} from "../../models/flickr.userInfo";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
    selector: "ImagesListComponent",
    templateUrl: "components/imagesList-component/imagesList.component.html",
    providers: [FlickrService],
    styleUrls: ["components/imagesList-component/imagesList.component.css"]
})
export class ImagesListComponent implements OnInit {
    
    photos: Array<FlickrPhotosSearchModel>;
    userId: string;
    userInfo: FlickrUserInfoModel = new FlickrUserInfoModel();
    progress: number = 0;

    constructor(private flickrService: FlickrService, private activatedRoute: ActivatedRoute, private zone: NgZone) {         
    }

    ngOnInit() {
        this.userInfo = new FlickrUserInfoModel();
        this.userInfo.realname = "Burke Holland"

        this.activatedRoute.params.subscribe(params => {
            this.userId = "25957759@N00"; // params["user_id"];
            this.loadUserInfo();
            this.updateProgress(20);
        });
    }

    loadUserInfo() {
        this.flickrService.getUserInfo(this.userId)
            .then((userInfo: FlickrUserInfoModel) => {
                this.userInfo = userInfo;
                
                this.updateProgress(50);
                
                this.loadListView();
            })
            .catch(error => console.log(error));
    }

    loadListView() {
        this.flickrService.photosSearch(this.userId)
            .then(photos => {
                
                this.photos = photos;
                
                this.updateProgress(100);
            })
            .catch(error => console.log(error));
    }

    updateProgress(value: number) {
        if (value < 100) {
            this.progress = value;
        }
        else {
            this.progress = 100;
            setTimeout(() => {
                this.progress = 0;
            }, 500);
        }
    }
}