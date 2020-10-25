import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL = "CAO";
  user: any;
  subscription: Subscription;
  private subject = new BehaviorSubject('');
  currentUser = this.subject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if ((JSON.parse(localStorage.getItem("currentUser"))) != null) {
      this.subject.next(JSON.parse(localStorage.getItem("currentUser")));
    }
  }

  getAllUsers(): Observable<any> {
    console.log("Saljem zahtev za podatke svih korisnika.")
    const credentials = JSON.parse(localStorage.getItem("Cao"));
    if (credentials && credentials.username !== undefined) {
      return this.http.get(this.baseURL + 'users/')
    }
    else {
      console.log("Korisnik nije ulogovan.")
      return null;
    }
  }

  findUser(username): Observable<any> {
    console.log("Saljem zahtev sa podatke korisnika." + username)
    const credentials = JSON.parse(localStorage.getItem("CAO"));
    if (credentials && credentials.username !== undefined) {
      return this.http.get(this.baseURL + 'users/' + username)
    }
    else {
      console.log("Korisnik nije ulogovan.")
      return null;
    }
  }

  setLoggedUser(user: any) {
    this.subject.next(user);
  }

  getLoggedUser(): Observable<any> {
    return this.subject;
  }

  getCurrentUser(): Observable<any> {
    console.log("Saljem zahtev za podatke korisnika.");
    const credentials = JSON.parse(localStorage.getItem("CAO"));
    if (credentials && credentials.username !== undefined) {
      console.log("Username je" + credentials.username);
      return this.http.get(this.baseURL + 'users/' + credentials.username)
    }
    else {
      console.log("Korisnik nije ulogovan.")
      return null;
    }
  }

  logIn(user: any): Observable<any> {
    return this.http.post(this.baseURL + 'users/login',
      { 'username': user.username, 'password': user.password })
      .pipe(map(res => {
        if (res) {
          return { 'success': true, 'username': user.username };
        } else {
          return { 'success': false, 'message': res };
        }

      }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setLoggedUser("");
    this.router.navigate(['/']);
  }

}
