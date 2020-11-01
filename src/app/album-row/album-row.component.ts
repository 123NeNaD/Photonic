import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { AlbumService } from '../services/album.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

const batchSize = 30;

@Component({
  selector: 'app-album-row',
  templateUrl: './album-row.component.html',
  styleUrls: ['./album-row.component.scss']
})
export class AlbumRowComponent implements OnInit {

  albumId: any;
  allPhotos = [];
  option: string = 'row';
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  theEndOfList = false;

  constructor(private route: ActivatedRoute, private router: Router, private albumService: AlbumService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.albumId = params['id'];
    });
    this.getInitialBatch();
  }

  changeView(view){
    if(view == 'grid'){
      this.router.navigate(['/gallery/albumGrid/' +  this.albumId])
    }
  }

  openFullSize(id){
    this.router.navigate(['/gallery/fullImage/'+ id])
  }

  goBack(){
    this.router.navigate(['/gallery/galleryGrid'])
  }

  getInitialBatch(){
    const endpoint = 'https://jsonplaceholder.typicode.com/photos?albumId=' + this.albumId;
    const startId = 0;
    const endId = startId + batchSize;
    this.http.get(endpoint).subscribe(allPhotos=>{
      if(Array.isArray(allPhotos)){
        var batchPhotos = allPhotos.slice(startId, endId)
        this.allPhotos = this.allPhotos.concat(batchPhotos);
        if(allPhotos.length<=endId) this.theEndOfList = true;
      }
      console.log("ALL PHOTOS LENGTH: ", this.allPhotos.length)
      console.log("ALL PHOTOS: ", this.allPhotos)
    }, error=>{console.log("ERROR: ", error)});
  }

  getNextBatch(event){
    if(this.allPhotos.length != 0){
      if(this.theEndOfList){
        return
      }
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      console.log("CURRENT: ", end);
      console.log("TOTAL: ", total);
      if(end === total){
        const endpoint = 'https://jsonplaceholder.typicode.com/photos?albumId=' + this.albumId;
        const startId = this.allPhotos.length;
        const endId = startId + batchSize;
        this.http.get(endpoint).subscribe(allPhotos=>{
          if(Array.isArray(allPhotos)){
            var batchPhotos = allPhotos.slice(startId, endId)
            this.allPhotos = this.allPhotos.concat(batchPhotos);
            if(allPhotos.length<=endId) this.theEndOfList = true;
          }
          console.log("ALL PHOTOS LENGTH: ", this.allPhotos.length)
          console.log("ALL PHOTOS: ", this.allPhotos)
        }, error=>{console.log("ERROR: ", error)});
      }
    }
  }

}
