import {Component} from "@angular/core";
import {FlickrService} from "../../services/flickr.service";
import {ActivatedRoute} from "@angular/router";
import {FlickrResponseModel} from "../../models/flickrResponse.model";

@Component({
    selector: "ImagesListComponent",
    templateUrl: "components/imagesList-component/imagesList.component.html",
    providers: [FlickrService]
})
export class ImagesListComponent {
    
    photos: Array<FlickrResponseModel>;
    userId: number;
    
    constructor(private flickrService: FlickrService, private activatedRoute: ActivatedRoute) {
        
        this.photos = new Array<FlickrResponseModel>();
        
        let model =new FlickrResponseModel();
        
        this.activatedRoute.params.subscribe(params => {
            this.userId = params["user_id"];
            this.loadListView();
        });
    }

    loadListView() {
        this.flickrService.photosSearch(this.userId).subscribe(photosResponse => {
            photosResponse.forEach(element => {
                this.photos.push(element);
            })
        });
    }
}