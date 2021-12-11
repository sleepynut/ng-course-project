import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';

export enum ShoppingListActionTypes {
  ADD_INGREDIENT = '[Shopping List] ADD_INGREDIENT',
  ADD_INGREDIENTS = '[Shopping List] ADD_INGREDIENTS',
  EDIT_INGREDIENT = '[Shopping List] EDIT_INGREDIENT',
  DELETE_INGREDIENT = '[Shopping List]  DELETE_INGREDIENT',
  SELECT_INGREDIENT = '[Shopping List]  SELECT_INGREDIENT',
  DESELECT_INGREDIENT = '[Shopping List]  DESELECT_INGREDIENT',
}

export class AddIngredient implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ShoppingListActionTypes.ADD_INGREDIENTS;
  constructor(public payload: Ingredient[]) {}
}

export class EditIngredient implements Action {
  readonly type = ShoppingListActionTypes.EDIT_INGREDIENT;
  constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = ShoppingListActionTypes.DELETE_INGREDIENT;
  constructor() {}
}

export class SelectIngredient implements Action {
  readonly type = ShoppingListActionTypes.SELECT_INGREDIENT;
  constructor(public payload: number) {}
}

export class DeselectIngredient implements Action {
  readonly type = ShoppingListActionTypes.DESELECT_INGREDIENT;
  constructor() {}
}

export type ShoppingListActions =
  | AddIngredient
  | AddIngredients
  | EditIngredient
  | DeleteIngredient
  | SelectIngredient
  | DeselectIngredient;
