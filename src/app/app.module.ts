import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { AuthComponent } from './auth/auth.component';
import { TokenInterceptor } from './services/token-interceptor.service';
import { LoginGuard } from './services/guards/login-guard';
import { LogoutGuard } from './services/guards/logout-guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent, AuthComponent, RegisterComponent, ChangePasswordComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NbSpinnerModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    
    {
      provide: LoginGuard, useClass: LoginGuard
    },
    {
      provide: LogoutGuard, useClass: LogoutGuard
    }
  ]
})
export class AppModule {
}
