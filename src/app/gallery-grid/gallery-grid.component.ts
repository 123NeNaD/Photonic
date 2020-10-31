import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-gallery-grid',
  templateUrl: './gallery-grid.component.html',
  styleUrls: ['./gallery-grid.component.scss']
})
export class GalleryGridComponent implements OnInit {

  albums: any;
  option = 'grid';

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(albums=>{
      console.log("Albums: ", albums)
      this.albums = albums;
    }, error => {console.log("ERROR: ", error)})
  }

  goToAlbum(id){
    console.log("Album ID: ", id);
    this.router.navigate(['/gallery/albumGrid/'+ id])
  }

  changeView(view){
    if(view == 'grid'){
      this.router.navigate(['/gallery/galleryGrid/'])
    }
    if(view == 'row'){
      this.router.navigate(['/gallery/galleryRow/'])
    }
  }

}
