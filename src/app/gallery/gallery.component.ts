import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  albums: any;
  option: string = 'grid';

  constructor(private router: Router, private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(albums=>{
      console.log("Albums: ", albums)
      this.albums = albums;
    }, error => {console.log("ERROR: ", error)})
  }

  goToAlbum(id){
    console.log("Album ID: ", id);
    this.router.navigate(['/gallery/album/'+ id])
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
