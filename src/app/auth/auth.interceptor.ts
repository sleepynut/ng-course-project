import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private as: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((state) => state.user),
      exhaustMap((user) => {
        let modifiedReq = request;

        if (user) {
          modifiedReq = request.clone({
            params: new HttpParams().set('auth', user.token),
          });
        }

        // console.log('REQ URL');
        // console.log(modifiedReq.urlWithParams);
        return next.handle(modifiedReq);
      })
    );
  }
}
