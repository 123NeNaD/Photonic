import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { HttpClient } from '@angular/common/http';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

const batchSize = 30;

@Component({
  selector: 'app-gallery-row',
  templateUrl: './gallery-row.component.html',
  styleUrls: ['./gallery-row.component.scss']
})
export class GalleryRowComponent implements OnInit {

  albums = [];
  option = 'row';
  @ViewChild(CdkVirtualScrollViewport) viewport: CdkVirtualScrollViewport;
  theEndOfList = false;

  constructor(private router: Router, private albumService: AlbumService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getInitialBatch();
  }

  goToAlbum(id){
    console.log("Album ID: ", id);
    this.router.navigate(['/gallery/albumGrid/'+ id])
  }

  changeView(view){
    if(view == 'grid'){
      this.router.navigate(['/gallery/galleryGrid/'])
    }
  }

  getInitialBatch(){
    const endpoint = 'https://jsonplaceholder.typicode.com/albums';
    const startId = 0;
    const endId = startId + batchSize + 1;
    this.http.get(endpoint).subscribe(allAlbums=>{
      if(Array.isArray(allAlbums)){
        var batchAlbums = allAlbums.filter((album)=> album.id>startId && album.id<endId);
        this.albums = this.albums.concat(batchAlbums);
        if(allAlbums.length<=endId) this.theEndOfList = true;
      }
    }, error=>{console.log("ERROR: ", error)});
  }

  getNextBatch(event){
    if(this.albums.length != 0){
      if(this.theEndOfList){
        return
      }
      const end = this.viewport.getRenderedRange().end;
      const total = this.viewport.getDataLength();
      if(end === total){
        const startId = this.albums.length;
        const endId = startId + batchSize + 1;
        const endpoint = 'https://jsonplaceholder.typicode.com/albums';
        this.http.get(endpoint).subscribe(allAlbums=>{
          if(Array.isArray(allAlbums)){
            var batchAlbums = allAlbums.filter((album)=> album.id>startId && album.id<endId);
            this.albums = this.albums.concat(batchAlbums);
            if(allAlbums.length<=endId) this.theEndOfList = true;
          }
        }, error=>{console.log("ERROR: ", error)});
      }
    }
  }

}
