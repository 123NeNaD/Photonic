import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = { username: '', password: '' };
  errMess: string;
  hide = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.userService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          console.log(this.user)
          this.userService.getCurrentUser()
            .subscribe(user => {
              console.log("Korisnik koji je stigao je:", user);
              this.userService.setLoggedUser(user);
              localStorage.setItem("currentUser", JSON.stringify(user));
            },
              error => {
                console.log(error);
                this.errMess = error;
              });
          this.router.navigate(['/gallery']);
        } else {
          this.errMess = res.message;
        }
      },
        error => {
          console.log(error);
          this.errMess = "Invalid Credentials";
        });
  }

}
