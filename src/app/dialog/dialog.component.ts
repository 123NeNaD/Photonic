import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlbumService } from '../services/album.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private router: Router, private albumService: AlbumService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("DATA: ", this.data);
  }

  deletePhoto(){
    const currentId = this.data.photoId;
    if(currentId == 5000){
      const nextId = currentId - 1;
    } else {
      const nextId = currentId + 1;
    }
    this.albumService.deletePhoto(currentId).subscribe(data=>{
      this.router.navigate(['/fullimage/'+ currentId])
      this.dialogRef.close();
    }, error=>{console.log(error)});


  }

}
