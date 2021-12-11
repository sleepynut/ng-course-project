import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private as: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select('auth').pipe(
      take(1),
      map((state) => state.user),
      map((user) => {
        if (!user) return this.router.parseUrl('/auth');
        return true;
      })
    );
  }
}
