import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FlickrService } from "../../services/flickr.service";
import { GetInfoResponse } from "../../models/getInfoResponse";

@Component({
    templateUrl: "components/image-component/image.component.html",
    providers: [ FlickrService, GetInfoResponse ]
})
export class ImageComponent implements OnInit {

    public url: string;

    public constructor(private activatedRoute: ActivatedRoute, private flickrService: FlickrService) { }

    public ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            let userId = params["user_id"];
            let photoId = params["photo_id"];

            this.getPhoto(photoId);
        });
    }

    public getPhoto(photoId: number) {
        this.flickrService.getPhotoInfo(photoId).subscribe(
            photo => {
                this.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`;
            },
            error => console.log(error)
        );
    }
}