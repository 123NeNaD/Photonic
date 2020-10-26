import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  allPhotos: any;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAllPhotosFromAlbum(1).subscribe(photos=>{
      this.allPhotos=photos;
      console.log("SLIKE: ", this.allPhotos);
    })
  }

}
