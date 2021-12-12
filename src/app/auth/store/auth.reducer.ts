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
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        errorMsg: null,
        user: action.payload,
        loading: false,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        errorMsg: null,
        user: null,
      };
    case AuthActionTypes.LOGIN_START:
      return {
        ...state,
        errorMsg: null,
        loading: true,
      };
    case AuthActionTypes.LOGIN_FAIL:
      return {
        ...state,
        errorMsg: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
