import { Action } from '@ngrx/store';
import { User } from '../user.model';
// import { User } from '../user.model';

export enum AuthActionTypes {
  AuthAuths = '[Auth] Auth Auths',
  AuthAuthsSuccess = '[Auth] Auth Auths Success',
  AuthAuthsFailure = '[Auth] Auth Auths Failure',

  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  LOGIN_START = '[Auth] Login start',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAIL = '[Auth] Login fail',
}

export class AuthAuths implements Action {
  readonly type = AuthActionTypes.AuthAuths;
}

export class AuthAuthsSuccess implements Action {
  readonly type = AuthActionTypes.AuthAuthsSuccess;
  constructor(public payload: { data: any }) {}
}

export class AuthAuthsFailure implements Action {
  readonly type = AuthActionTypes.AuthAuthsFailure;
  constructor(public payload: { error: any }) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

export type AuthActions =
  | AuthAuths
  | AuthAuthsSuccess
  | AuthAuthsFailure
  | Login
  | Logout;
