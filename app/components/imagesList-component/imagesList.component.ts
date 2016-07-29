import {Component, OnInit, NgZone} from "@angular/core";
import {FlickrService} from "../../services/flickr.service";
import {ActivatedRoute} from "@angular/router";
import {FlickrResponseModel} from "../../models/flickrResponse.model";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Component({
    selector: "ImagesListComponent",
    templateUrl: "components/imagesList-component/imagesList.component.html",
    providers: [FlickrService]
})
export class ImagesListComponent implements OnInit {
    
    photos: Array<FlickrResponseModel>;

    userId: number;
  
    constructor(private flickrService: FlickrService, private activatedRoute: ActivatedRoute, private zone: NgZone) {         
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.userId = params["user_id"];
            this.loadListView();
        });
    }

    loadListView() {
        this.flickrService.photosSearch(this.userId)
            .then(photos => { 
                this.photos = photos
            })
            .catch(error => console.log(error));
    }
}