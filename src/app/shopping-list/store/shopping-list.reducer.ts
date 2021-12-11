import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as sla from './shopping-list.actions';

export const shoppingListFeatureKey = 'shoppingList';

export interface State {
  selIngredient: number;
  ingredients: Ingredient[];
}

export const initialState: State = {
  selIngredient: -1,
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state: State = initialState,
  action: sla.ShoppingListActions
): State {
  switch (action.type) {
    case sla.ShoppingListActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case sla.ShoppingListActionTypes.ADD_INGREDIENTS:
      // console.log(
      //   'payload: ' + JSON.stringify((<sla.AddIngredients>action).payload)
      // );
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case sla.ShoppingListActionTypes.SELECT_INGREDIENT:
      return {
        ...state,
        selIngredient: action.payload,
      };
    case sla.ShoppingListActionTypes.DESELECT_INGREDIENT:
      return {
        ...state,
        selIngredient: -1,
      };
    case sla.ShoppingListActionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        selIngredient: -1,
        ingredients: state.ingredients.filter((_, index) => {
          return index != state.selIngredient;
        }),
      };
    case sla.ShoppingListActionTypes.EDIT_INGREDIENT:
      // let newIngredient = new Ingredient(
      //   action.payload.name,
      //   action.payload.amount
      // );
      let newIngredients = [...state.ingredients];
      newIngredients[state.selIngredient] = action.payload;
      return {
        ...state,
        selIngredient: -1,
        ingredients: newIngredients,
      };
    default:
      return state;
  }
}
