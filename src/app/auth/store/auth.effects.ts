import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  AuthSuccess,
  AuthFail,
  LoginStart,
  SignupStart,
  AuthActions,
  AutoLogin,
  AutoLogout,
  Logout,
} from './auth.actions';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  timeoutCB: any;

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_START),
    switchMap((authData: LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((authRespData) => this.handleAuth(authRespData)),
          catchError((err: any) => this.handleError(err))
        );
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_START),
    switchMap((authData: SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((authRespData) => this.handleAuth(authRespData)),
          catchError((err: any) => this.handleError(err))
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/recipes']);
    })
  );

  @Effect({ dispatch: false })
  logOut = this.actions$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      clearInterval(this.timeoutCB);
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActionTypes.AUTO_LOGIN),
    map(() => {
      let userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) return { type: 'DUMMY' };

      let loadedUser: User = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpDate)
      );
      return new AuthSuccess(loadedUser);
    })
  );

  @Effect({ dispatch: false })
  autoLogout = this.actions$.pipe(
    ofType(AuthActionTypes.AUTO_LOGOUT),
    tap((actionData: AutoLogout) => {
      console.log('expires in: ' + actionData.payload);
      this.timeoutCB = setTimeout(() => {
        this.store.dispatch(new Logout());
      }, actionData.payload);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  private handleAuth(authRespData: AuthResponseData): AuthActions {
    const expireDate = new Date(
      new Date().getTime() + +authRespData.expiresIn * 1000
    );
    // console.log('expireDate: ' + expireDate);
    // console.log('expiresIn: ' + expiresIn);
    // console.log('getTime: ' + new Date().getTime());
    let u = new User(
      authRespData.email,
      authRespData.localId,
      authRespData.idToken,
      expireDate
    );

    // console.log('user!!');
    // console.log(u);
    console.log('user: ' + u);
    localStorage.setItem('userData', JSON.stringify(u));

    this.store.dispatch(
      new AutoLogout(u.tokenExpDate.getTime() - new Date().getTime())
    );

    return new AuthSuccess(u);
  }

  private handleError(err: any): Observable<AuthActions> {
    let errorMessage = 'There exists an unknown error.';
    if (!err.error || !err.error.error) return of(new AuthFail(errorMessage));

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

    // console.log('ERROR MESSAGE: ' + errorMessage);
    return of(new AuthFail(errorMessage));
  }
}
