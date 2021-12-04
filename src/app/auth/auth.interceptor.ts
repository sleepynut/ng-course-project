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
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private as: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.as.user.pipe(
      take(1),
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
