import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Role } from "../../models/role.enum";
import { AuthService } from "../auth.service";
import { SessionService } from "../session.service";

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private sessionService: SessionService, 
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const user = this.sessionService.getUserInfo();
        //debugger;
        if(!user) {
            this.authService.redirectToLogin();
            return false;
        }
        else if(state.url == '/pages/maps/report') {
            if(user.role == Role.Admin || user.role == Role.Report || user.role == Role.Scan) {
                return true;
            }
        }

        else if(state.url == '/pages/maps/search') {
            if(user.role == Role.Admin || user.role == Role.Search) {
                return true;
            }
        }
        else if(state.url == '/pages/maps/scan-form') {
            if(user.role == Role.Admin || user.role == Role.Scan) {
                return true;
            }
        } 
        else if(state.url == '/pages/dashboard') {
            if(user.role == Role.Admin) {
                return true;
            }
        }
        else if(state.url == '/auth/register') {
            if(user.role == Role.Admin) {
                return true;
            }
        }
        this.authService.redirectToHome();
        return false;
    }
}