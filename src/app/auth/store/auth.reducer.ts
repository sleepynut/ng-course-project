import { User } from '../user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  errorMsg: string;
  user: User;
  loading: boolean;
}

export const initialState: State = {
  errorMsg: null,
  user: null,
  loading: false,
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        errorMsg: null,
        user: action.payload.user,
        loading: false,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        errorMsg: null,
        user: null,
      };
    case AuthActionTypes.SIGNUP_START:
    case AuthActionTypes.LOGIN_START:
      return {
        ...state,
        errorMsg: null,
        loading: true,
      };
    case AuthActionTypes.AUTH_FAIL:
      return {
        ...state,
        errorMsg: action.payload,
        loading: false,
      };
    case AuthActionTypes.CLEAR_ERROR:
      return {
        ...state,
        errorMsg: null,
      };
    default:
      return state;
  }
}
