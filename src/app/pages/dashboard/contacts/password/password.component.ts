import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../../services/toast.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  constructor(
    private toast: ToastService,
    public modal: NgbActiveModal,
    public userService: UserService) { }

  id: number;

  showMessages = {
    error: false,
    success: false,
  }

  loading = false;

  pass: string = "";
  confirmPassword: string = "";

  submitted = false

  errors = [];

  messages = [];

  //constructor() { }

  ngOnInit() {
  }

  resetPass() {
    this.loading = true;
    this.userService.changePassword(this.id, this.pass).subscribe(res => {
      this.loading = false;
      this.toast.showSuccess('Success', "Password Updated Successfully");
      this.modal.close();
    }, err => {
      this.loading = false;
      this.toast.showError('Error', "Something went wrong");
    });
  }


}
