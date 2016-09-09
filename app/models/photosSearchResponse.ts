export class PhotosSearchResponse {
  id: string;
  owner: string;
  secret: string;
  server: number;
  title: string;
  latitude: number;
  longitude: number;
  datetaken: string;
  url_t: string;
  url_m: string;
  url_q: string;
  url_n: string;
  distance: string;

  constructor() {
    this.url_n = " ";
  }
}