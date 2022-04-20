import { HttpClient,HttpBackend  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Auth, AuthResponse, Register } from '../models/auth.model';
import { Log } from '../models/log.model';
import { ApiResponse } from '../models/response.model';
import { Role } from '../models/role.enum';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  private authHttp: HttpClient;

  constructor(private backend: HttpBackend, private http: HttpClient) { 
    this.authHttp = new HttpClient(backend);
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    //return new ServerDataSource(this.http, { endPoint: `${this.baseUrl}/users` });
    return this.authHttp.get<ApiResponse<User[]>>(`${this.baseUrl}/users`);
  }

  getUserLogs(): Observable<ApiResponse<Log[]>> {
    return this.authHttp.get<ApiResponse<Log[]>>(`${this.baseUrl}/logs`);
  }

  blockUser(id) {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/users/${id}`, {
      isBlocked: true
    })
  }

  login(auth: Auth) {
    return this.authHttp.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/users/authenticate`, {
      ...auth
    });
  }

  register(reg: Register) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/users/addUser`, {
      ...reg
    });
  }

  changePassword(id: number, password: string) {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/users/${id}`, {
      password
    });
  }

  changeRole(id: number, role: Role) {
    return this.http.post<ApiResponse<User>>(`${this.baseUrl}/users/${id}`, {
      role: parseInt(role.toString())
    });
  }

}
