import { User } from '../user.model';
import { AuthActions, AuthActionTypes } from './auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
}

export const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}
