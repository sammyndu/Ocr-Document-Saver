import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../../models/user.model';
import { ToastService } from '../../../../services/toast.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.css']
})
export class ChangeRoleComponent implements OnInit {

  user = new User();
  userObject = new User();
  loading = false;

  constructor(
    private toast: ToastService,
    public modal: NgbActiveModal,
    public userService: UserService) {}

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.userObject = JSON.parse(JSON.stringify(this.user));
    console.log(this.user, this.userObject);
  }

  save() {
    this.loading = true;
    console.log(this.userObject);
    this.userService.changeRole(this.user.id, this.userObject.role).subscribe(res => {
      console.log(res);
      this.loading = false;
      this.toast.showSuccess('Success', "Role Updated Successfully");
      this.modal.close();
    }, err => {
      this.loading = false;
      this.toast.showError('Error', "Something went wrong");
    });
  } 
}
