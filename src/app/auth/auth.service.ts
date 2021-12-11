import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Login, Logout } from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  timeoutCB: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((authRespData) => {
          this.handleAuth(
            authRespData.email,
            authRespData.localId,
            authRespData.idToken,
            +authRespData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseAPIKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((authRespData) => {
          this.handleAuth(
            authRespData.email,
            authRespData.localId,
            authRespData.idToken,
            +authRespData.expiresIn
          );
        })
      );
  }
  autoLogin() {
    let userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    let loadedUser: User = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpDate)
    );
    // this.user.next(loadedUser);
    this.store.dispatch(new Login(loadedUser));

    if (loadedUser.token) {
      this.autoLogout(loadedUser.tokenExpDate.getTime() - new Date().getTime());
      console.log('SUCCESS');
    } else {
      console.log('FAIL');
    }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new Logout());

    localStorage.removeItem('userData');
    clearTimeout(this.timeoutCB);
    this.router.navigate(['/auth']);
  }

  autoLogout(expiresIn: number) {
    console.log('expires in: ' + expiresIn);
    this.timeoutCB = setTimeout(() => {
      this.logout();
    }, expiresIn);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'There exists an unknown error.';
    if (!err.error || !err.error.error) return throwError(errorMessage);

    switch (err.error.error.message) {
      case 'EMAIL_NOT_FOUND':
      case 'INVALID_PASSWORD':
        errorMessage = 'Email/Password is incorrect.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'This account has been disabled by the administrator.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This email is already taken.';
    }
    return throwError(errorMessage);
  }

  private handleAuth(
    email: string,
    id: string,
    token: string,
    expiresIn: number
  ) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    console.log('expireDate: ' + expireDate);
    console.log('expiresIn: ' + expiresIn);
    console.log('getTime: ' + new Date().getTime());
    let u = new User(email, id, token, expireDate);

    console.log('user!!');
    console.log(u);
    // this.user.next(u);
    this.store.dispatch(new Login(u));

    localStorage.setItem('userData', JSON.stringify(u));
    this.autoLogout(expiresIn * 1000);
  }
}
