import { ChangePasswordComponent } from './../../../auth/change-password/change-password.component';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';

import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';
import { RenderComponent, RoleRenderComponent } from './render/render.component';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { ConstantPool } from '@angular/compiler';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.enum';
import { Log } from '../../../models/log.model';
import { ToastService } from '../../../services/toast.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { PasswordComponent } from './password/password.component';
import { Scan } from '../../../models/scan.model';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnChanges, OnDestroy {

  private alive = true;

  @Input() users: User[];
  //@Input() blockedUsers: User[];
  @Input() logs: Log[];

  scans: Scan[] = []; 

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  loading = false;

  isBlockedToolTip: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtTrigger2: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private toast: ToastService) {}

  ngOnInit(): void {
    //this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    
    //this.getUsers();
    //this.getDashboardData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes) {
      this.getScans()
      this.dtTrigger.next();
      this.dtTrigger2.next();
    }
    
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      this.rerender();
      this.users = res.content;
      this.dtTrigger.next();
    });
  }

  getRole(value: number) {
    return Role[value];
  }

  getScans() {

     this.logs.filter(x => x.action == "Add Scan").forEach(log => {

      const scan = this.scans.find(x => x.date.toString().substring(0,10) == log.dateCreated.toString().substring(0,10) && x.username == log.username);
      console.log(log.dateCreated.toString().substring(0,10));
      console.log(scan?.date.toString().substring(0,10));
        console.log(scan)
      if(scan) {
          scan.scans += 1;
        }
        else {
          const newScan =  new Scan();
          const logDate = new Date(log.dateCreated);
          newScan.date = log.dateCreated;
          newScan.username = log.username;
          newScan.scans = 1;
          this.scans.push(newScan);
          console.log(this.scans)
        }
     });
  }

  getDashboardData() {
    this.loading = true;
    forkJoin(
      {
        userResponse: this.userService.getUsers(), 
        logsResponse: this.userService.getUserLogs(),
      }).subscribe(({userResponse, logsResponse}) => {
        this.loading = false;
        this.users = userResponse.content;
        this.logs = logsResponse.content;
        this.dtTrigger.next();
        //this.blockedUsers = this.users.filter(x => x.isBlocked);
    }, err => {
      this.loading = false;
      this.toast.showError("Error", "Something went wrong");
    })
  }

  blockUser(id: number) {
    this.loading = true;
    this.userService.blockUser(id).subscribe((res) => {
      this.loading = false;
      let block = this.users.filter(x => x.id === id)[0].isBlocked;
      this.users.filter(x => x.id === id)[0].isBlocked = !this.users.filter(x => x.id === id)[0].isBlocked;
      !block ?
      this.toast.showSuccess('Blocked', 'User blocked successfully') :
      this.toast.showSuccess('Unblocked', 'User unblocked successfully')
    }, err => {
      this.loading = false;
      this.toast.showError('Error', 'Unable to block/unblock user');
    })
  }

  openChangeRole(id) {

    const user = this.users.filter(x => x.id === id)[0];
    //const dialogRef = this.dialogService.open(ChangeRoleComponent);
    const modalRef = this.modalService.open(ChangeRoleComponent);

    modalRef.componentInstance.user = user;

    modalRef.result.then(res => { this.getUsers(); });
  }

  openChangePassword(id) {

    const user = this.users.filter(x => x.id === id)[0];
    //const dialogRef = this.dialogService.open(ChangeRoleComponent);
    const modalRef = this.modalService.open(PasswordComponent);

    modalRef.componentInstance.id = user.id;
  }

  getBlockedToolTip(id) {
    return this.users.filter(x => x.id === id)[0].isBlocked ? "Unblock User" : "Block User"
  }

  getBlockedIcon(id) {
    return this.users.filter(x => x.id === id)[0].isBlocked ? "unlock-outline" : "lock-outline"
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  rerender(): void {

    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();

      //this.dtTrigger.unsubscribe();
      // Call the dtTrigger to rerender again
      //this.dtTrigger.next();
    });
  }

  // test() {
  //   forkJoin(
  //     this.userService.getUsers(),
  //     this.userService.getUserLogs(),
  //   )
  //     .pipe(takeWhile(() => this.alive))
  //     .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
  //       this.contacts = contacts;
  //       this.recent = recent;
  //     });
  // }

   sortDate(direction: any, a: string, b: string): number {
    let first = Number(new DatePipe('en-US').transform(a, 'yyyyMMdd'));
    let second = Number(new DatePipe('en-US').transform(b, 'yyyyMMdd'));

    if (first < second) {
        return -1 * direction;
    }
    if (first > second) {
        return direction;
    }
    return 0;
}

  ngOnDestroy() {
    this.alive = false;
  }
}
