import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AuthAuths = '[Auth] Auth Auths',
  AuthAuthsSuccess = '[Auth] Auth Auths Success',
  AuthAuthsFailure = '[Auth] Auth Auths Failure',
}

export class AuthAuths implements Action {
  readonly type = AuthActionTypes.AuthAuths;
}

export class AuthAuthsSuccess implements Action {
  readonly type = AuthActionTypes.AuthAuthsSuccess;
  constructor(public payload: { data: any }) { }
}

export class AuthAuthsFailure implements Action {
  readonly type = AuthActionTypes.AuthAuthsFailure;
  constructor(public payload: { error: any }) { }
}

export type AuthActions = AuthAuths | AuthAuthsSuccess | AuthAuthsFailure;

