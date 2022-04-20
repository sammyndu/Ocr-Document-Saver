import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private _sessionService: SessionService,
    private _toastService: ToastService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._sessionService.getAccessToken()}`
      }
    });
    return next.handle(request).pipe(
      tap(
        x => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._toastService.showError("Unauthorized",
                'You must login to perform this action.'
              );
              this.auth.redirectToLogin();
            }
          }

          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
              this._toastService.showError("UnAuthorized",
                'You do not have permisson to perform this action.'
              );
              this.auth.redirectToHome();
            }
          }
        }
      )
    );
  }

}
