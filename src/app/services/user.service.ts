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

  subscription: Subscription;
  private subject = new BehaviorSubject('');
  currentUser = this.subject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    if ((JSON.parse(localStorage.getItem("currentUser"))) != null) {
      this.subject.next(JSON.parse(localStorage.getItem("currentUser")));
    }
  }

  getAllUsers(): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(endpoint);
  }

  findUser(username): Observable<any> {
    const endpoint = 'https://jsonplaceholder.typicode.com/users?username=' + username;
    return this.http.get(endpoint);
  }

  setLoggedUser(user: any) {
    this.subject.next(user);
  }

  getLoggedUser(): Observable<any> {
    return this.subject;
  }

  logIn(user: any): Observable<any> {
    const username = user.username;
    const email = user.password;
    const endpoint = 'https://jsonplaceholder.typicode.com/users?username=' + username + '&email=' + email;
    return this.http.get(endpoint);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.setLoggedUser("");
    this.router.navigate(['/']);
  }

}
