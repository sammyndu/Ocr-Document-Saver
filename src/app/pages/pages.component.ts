import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { Role } from '../models/role.enum';
import { User } from '../models/user.model';
import { SessionService } from '../services/session.service';

//import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: any;
  user:User = new User()
  MENU_ITEMS: NbMenuItem[]
  

  constructor(private sessionService: SessionService) {
    this.user = this.sessionService.getUserInfo();
    if(this.user) {
      this.MENU_ITEMS = [
        {
          title: 'Dashboard',
          icon: 'home-outline',
          link: '/pages/dashboard',
          hidden: this.user.role != Role.Admin
        },
        {
          title: 'Add User',
          icon: 'person-add-outline',
          link: '/auth/register',
          hidden: this.user.role != Role.Admin
        },
        {
          title: 'Search',
          icon: 'search-outline',
          link: '/pages/maps/search',
          hidden: this.user.role != Role.Admin && this.user.role != Role.Search && this.user.role != Role.Scan
        },
        {
          title: 'Scan',
          icon: 'eye-outline',
          link: '/pages/maps/scan-form',
          hidden: this.user.role != Role.Admin && this.user.role != Role.Scan
        },
        {
          title: 'Report',
          icon: 'list-outline',
          link: '/pages/maps/report',
          hidden: this.user.role != Role.Admin && this.user.role != Role.Report && this.user.role != Role.Scan
        },
        {
          title: 'New Report',
          icon: 'list-outline',
          link: '/pages/maps/new-report',
          hidden: this.user.role != Role.Admin
        },
      ];
    }
   
    this.menu = this.MENU_ITEMS;
  }


}
