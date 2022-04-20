import { LogoutGuard } from './services/guards/logout-guard';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { RegisterComponent } from './auth/register/register.component';
import { LoginGuard } from './services/guards/login-guard';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      { path: 'login', component: AuthComponent, canActivate: [LogoutGuard] },
      { path: 'register', component: RegisterComponent,canActivate: [LoginGuard] },
    ]
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
