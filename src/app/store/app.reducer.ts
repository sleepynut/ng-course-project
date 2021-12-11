import { Action, ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

// export const appFeatureKey = 'app';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
};

// export const initialState: State = {};

// export function appReducer(state = initialState, action: Action): State {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }
