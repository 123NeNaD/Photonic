import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-gallery-row',
  templateUrl: './gallery-row.component.html',
  styleUrls: ['./gallery-row.component.scss']
})
export class GalleryRowComponent implements OnInit {

  albums: any;
  option = 'row';

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
  }

}
