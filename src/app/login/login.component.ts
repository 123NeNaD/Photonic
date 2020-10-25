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
    this.userService.logIn(this.user).subscribe(user => {

      if(user[0]){
        console.log("User Arrived: ", user);
        this.userService.setLoggedUser(user[0]);
        localStorage.setItem("currentUser", JSON.stringify(user[0]))
        this.router.navigate(['/gallery'])
      } else {
        this.errMess = "Invalid Credentials";
      }


      }, error => {console.log("ERROR: ", error); this.errMess = "Invalid Credentials"; });
  }

}
