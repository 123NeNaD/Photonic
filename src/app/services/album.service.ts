import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  subscription: Subscription;
  private subject = new BehaviorSubject('');
  currentAlbum = this.subject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if ((JSON.parse(localStorage.getItem("currentAlbum"))) != null) {
      this.subject.next(JSON.parse(localStorage.getItem("currentAlbum")));
    }
  }

  getAllAlbums(): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/albums';
    return this.http.get(endpoint);
  }

  getPhoto(id): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/photos?id=' + id;
    return this.http.get(endpoint);
  }

  deletePhoto(id): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/photos?id=' + id;
    return this.http.delete(endpoint);
  }

  findAlbum(id): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/albums?id=' + id;
    return this.http.get(endpoint);
  }

  getAllPhotosFromAlbum(albumId): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/photos?albumId=' + albumId;
    return this.http.get(endpoint);
  }

  setCurrentAlbum(album: any) {
    this.subject.next(album);
  }

  getCurentUser(): Observable<any> {
    return this.subject;
  }

}
