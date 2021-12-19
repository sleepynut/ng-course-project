import { Action } from '@ngrx/store';
import { User } from '../user.model';
// import { User } from '../user.model';

export enum AuthActionTypes {
  AuthAuths = '[Auth] Auth Auths',
  AuthAuthsSuccess = '[Auth] Auth Auths Success',
  AuthAuthsFailure = '[Auth] Auth Auths Failure',

  LOGIN_START = '[Auth] Login start',
  AUTH_SUCCESS = '[Auth] Authenticate success',
  AUTH_FAIL = '[Auth] Authenticate fail',
  LOGOUT = '[Auth] Logout',
  // LOGIN_SUCCESS = '[Auth] Login success',
  SIGNUP_START = '[Auth] Signup start',
  CLEAR_ERROR = '[Auth] Clear error',
  AUTO_LOGIN = '[Auth] Auto Login',
  AUTO_LOGOUT = '[Auth] Auto Logout',
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

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
  constructor() {}
}

export class LoginStart implements Action {
  readonly type = AuthActionTypes.LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthFail implements Action {
  readonly type = AuthActionTypes.AUTH_FAIL;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = AuthActionTypes.SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = AuthActionTypes.CLEAR_ERROR;
  constructor() {}
}

export class AutoLogin implements Action {
  readonly type = AuthActionTypes.AUTO_LOGIN;
  constructor() {}
}

export class AutoLogout implements Action {
  readonly type = AuthActionTypes.AUTO_LOGOUT;
  constructor(public payload: number) {}
}

export type AuthActions =
  | AuthAuths
  | AuthAuthsSuccess
  | AuthAuthsFailure
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFail
  | SignupStart
  | ClearError
  | AutoLogout
  | AutoLogin;
