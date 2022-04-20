import { Component, OnInit } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  auth = new Auth();
  user = new User();

  loading = false;

  showMessages = {
    error: false,
    success: false,
  }

  submitted = false

  errors = [];

  messages = [];

  constructor(
    private userService: UserService, 
    private authService: AuthService, 
    private toast: ToastService,
    private sessionService: SessionService) {
      if(this.sessionService.isAuthenticated()) {
        this.authService.redirectToHome();
      }
     }

  ngOnInit() {

  }

  login(){
    console.log(this.auth);
    this.loading = true;
    this.userService.login(this.auth).subscribe(res => {
      this.loading = false;
      this.sessionService.setAccessToken(res.content.token);
      this.user = res.content.user;
      this.sessionService.setUserInfo(res.content.user);
      this.authService.redirectToHome();
    }, err => {
      this.loading = false;
      console.log(err);
      this.toast.showError(err.error.error?.type ?? "Error", err.error.error?.message ?? "Something went wrong");
    })
  }
}
