import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AlbumService } from '../services/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fullimage',
  templateUrl: './fullimage.component.html',
  styleUrls: ['./fullimage.component.scss']
})
export class FullimageComponent implements OnInit {

  photo: any;
  prev: any;
  next: any;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private albumService: AlbumService) { }
  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => { return this.albumService.getPhoto(params['id']); }))
    .subscribe(photo => {
      this.photo = photo[0];
      this.setPrevNext(this.photo.id);
    },
    error => {console.log("ERROR: ", error)});
  }

   setPrevNext(photoId) {
    if(photoId == 1){
      this.prev = 1;
      this.next = 2;
    } else if(photoId == 5000){
      this.prev = 4999;
      this.next = 5000;
    } else {
      this.prev = photoId - 1;
      this.next = photoId + 1;
    }
  }

  goBack(albumId): void {
    this.router.navigate(['/album/'+ albumId])
  }

}
