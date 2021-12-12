import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { AuthActionTypes, Login, LoginFail, LoginStart } from './auth.actions';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import { Router } from '@angular/router';

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
          map((authRespData) => {
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
            return new Login(u);
          }),
          catchError((err) => {
            let errorMessage = 'There exists an unknown error.';
            if (!err.error || !err.error.error)
              return of(new LoginFail(errorMessage));

            switch (err.error.error.message) {
              case 'EMAIL_NOT_FOUND':
              case 'INVALID_PASSWORD':
                errorMessage = 'Email/Password is incorrect.';
                break;
              case 'USER_DISABLED':
                errorMessage =
                  'This account has been disabled by the administrator.';
                break;
              case 'EMAIL_EXISTS':
                errorMessage = 'This email is already taken.';
            }
            return of(new LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    tap(() => {
      this.router.navigate(['/recipes']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
