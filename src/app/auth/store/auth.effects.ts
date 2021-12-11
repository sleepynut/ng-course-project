import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

@Injectable()
export class AuthEffects {
  authLogin = this.actions$.pipe(ofType());

  constructor(private actions$: Actions) {}
}
