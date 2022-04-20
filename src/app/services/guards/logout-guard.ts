import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SessionService } from "../session.service";

@Injectable()
export class LogoutGuard implements CanActivate {

    constructor(private sessionService: SessionService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.sessionService.isAuthenticated()) { // determine if the uder is logged in from this method.
            return true;
        }
        this.router.navigate(['/dashboard']);
        return false;
    }
}