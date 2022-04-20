import { RoleGuard } from './../services/guards/role-guard';
import { DocumentService } from './../services/document.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

import { AuthComponent } from '../auth/auth.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
  ],
  declarations: [
    PagesComponent
  ],
  providers: [
    DocumentService,
    {
      provide: RoleGuard, useClass: RoleGuard
    },
  ]
})
export class PagesModule {
}
