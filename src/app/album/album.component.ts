import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { visibility, flyInOut, expand } from '../animations/app.animation';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  albumId: any;
  allPhotos: any;
  option: string = 'grid';

  constructor(private route: ActivatedRoute, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {
      this.albumId = params['id'];
      return this.albumService.getAllPhotosFromAlbum(this.albumId);
     }))
    .subscribe(photos => {
      this.allPhotos = photos;
      console.log("PHOTOS: ", this.allPhotos);
    }, error => {console.log("ERROR: ", error)});
  }

  changeView(view){
    if(view == 'grid'){
      this.option = 'grid';
    }
    if(view == 'row'){
      this.option = 'row';
    }
  }

}
