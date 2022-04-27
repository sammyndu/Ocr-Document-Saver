import { SessionService } from './session.service';
import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { Role } from '../models/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private sessionService: SessionService,
    public router: Router
  ) { }
    
  redirectToPreviousPge() {
    this.router.events
      .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
      ).subscribe((e: any) => {
        this.router.navigate([e[0].urlAfterRedirects], { replaceUrl: true });
      console.log(e[0].urlAfterRedirects); // previous url
    });

  }

  redirectToHome() {
    const user = this.sessionService.getUserInfo();
    if(user.role != Role.Admin){
      if(user.role == Role.Search) {
        this.router.navigate(['/pages/maps/search']);
        return;
      } else if(user.role == Role.Report) {
        console.log('report')
        this.router.navigate(['/pages/maps/report']);
        return;
      }else if(user.role == Role.Scan) {
        this.router.navigate(['/pages/maps/scan-form']);
        return;
      }
    }
    this.router.navigate(['/dashboard']);
  }

  redirectToLogin() {
    this.router.navigate(['auth/login']);
  }
}
