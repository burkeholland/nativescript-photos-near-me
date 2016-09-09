import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlickrService } from "../../services/flickr.service";
import { GetInfoResponse } from "../../models/getInfoResponse";

@Component({
    templateUrl: "components/image-component/image.component.html",
    providers: [ FlickrService, GetInfoResponse ]
})
export class ImageComponent implements OnInit {
    
    url: string;

    photo: GetInfoResponse = new GetInfoResponse();

    constructor(private activatedRoute: ActivatedRoute, private flickrService: FlickrService) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            let userId = params["user_id"];
            let photoId = params["photo_id"];

            this.getPhoto(photoId);
        });
    }

    getPhoto(photoId: number) {
        this.flickrService.getPhotoInfo(photoId).subscribe(
            photo => {
                // this.photo = photo;
                this.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
            },
            error => console.log(error)
        );
    } 
}