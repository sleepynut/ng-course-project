import { Action } from '@ngrx/store';
import { User } from '../user.model';
// import { User } from '../user.model';

export enum AuthActionTypes {
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

export class AuthSuccess implements Action {
  readonly type = AuthActionTypes.AUTH_SUCCESS;
  constructor(public payload: { user: User; redirect: boolean }) {}
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
  | AuthSuccess
  | Logout
  | LoginStart
  | AuthFail
  | SignupStart
  | ClearError
  | AutoLogout
  | AutoLogin;
