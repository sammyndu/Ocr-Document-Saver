import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Subject } from 'rxjs';
import { SessionStates } from '../models/session-state.enum';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  tokenKey: string = "token";
  userInfoKey: string = 'userInfo';

  private _window: Window = window;
  private _minMillisecondsToExpiration = 1000 * 60; // 1 minute
  private _currentState = SessionStates.Unknown;
  private _subject = new Subject<SessionStates>();

  constructor() {
    this.trackTokenExpiration();
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();

    return token && !this.isTokenExpired(token);
  }

  getAccessToken(): string {
    return this._window.localStorage.getItem(this.tokenKey);
  }

  setAccessToken(token: string) {
    this._window.localStorage.setItem(this.tokenKey, token);
  }

  setUserInfo(user: User) {
    this._window.localStorage.setItem(
      this.userInfoKey,
      JSON.stringify(user)
    );
    if (this._currentState !== SessionStates.LoggedIn) {
      this.setCurrentState(SessionStates.LoggedIn);
    }
  }

  getUserInfo(): User {
    const userJson = this._window.localStorage.getItem(
      this.userInfoKey
    );

    if (userJson) {
      try {
        
        let user = new User();
        user = JSON.parse(userJson);

        return user;
      } catch {
        return null;
      }
    }

    return null;
  }


  private isTokenExpired(token: string): boolean {
    try {
      if (this.decode(token).exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  clearSession() {
    this._window.localStorage.removeItem(this.tokenKey);
    this._window.localStorage.removeItem(this.userInfoKey);

    this.setCurrentState(SessionStates.LoggedOff);
  }

  private trackTokenExpiration() {
    this._window.setInterval(() => {
      const token = this.getAccessToken();
      let state: SessionStates;

      if (!token) {
        state = SessionStates.LoggedOff;
      } else {
        const decodedToken = this.decode(token);
        const expTime = decodedToken.exp.valueOf() * 1000;
        const nowTime = Date.now().valueOf();

        if (nowTime >= expTime) {
          state = SessionStates.LoggedOff;
        } else {
          state = SessionStates.LoggedIn;
        }
      }

      this.setCurrentState(state);
    }, 5000);
  }

  private setCurrentState(state: SessionStates) {
    if (state === this._currentState) {
      return;
    }

    this._currentState = state;
    this._subject.next(this._currentState);
  }

  private decode(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }

}
