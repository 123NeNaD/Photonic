import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AlbumService } from '../services/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-grid',
  templateUrl: './album-grid.component.html',
  styleUrls: ['./album-grid.component.scss']
})
export class AlbumGridComponent implements OnInit {

  albumId: any;
  allPhotos: any;
  option: string = 'grid';

  constructor(private route: ActivatedRoute, private router: Router, private albumService: AlbumService) { }

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
      this.router.navigate(['/gallery/albumGrid/' +  this.albumId])
    }
    if(view == 'row'){
      this.router.navigate(['/gallery/albumRow/' +  this.albumId])
    }
  }

  openFullSize(id){
    this.router.navigate(['/gallery/fullImage/'+ id])
  }

  goBack(){
    this.router.navigate(['/gallery/galleryGrid'])
  }

}
