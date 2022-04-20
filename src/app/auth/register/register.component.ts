import { Component, OnInit } from '@angular/core';
import { Register } from '../../models/auth.model';
import { Role } from '../../models/role.enum';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signUp = new Register();
  confirmPassword: string = "";

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
    private toastService: ToastService,
    private sessionService: SessionService) {
      if(!this.sessionService.isAuthenticated()) {
        this.authService.redirectToLogin();
      }

      if(this.sessionService.getUserInfo().role != Role.Admin) {
        this.authService.redirectToHome();
      }
     }

  ngOnInit() {
  }

  register(){
    console.log(this.signUp);
    this.userService.register(this.signUp).subscribe(res => {
      this.toastService.showSuccess("Added", "User added successfully");
      this.authService.redirectToHome();
    })
  }
}
