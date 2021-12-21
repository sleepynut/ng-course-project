import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipesActionTypes {
  SET_RECIPES = '[Recipes] Set recipes',
  FETCH_RECIPES = '[Recipes] Fetch recipes',
  STORE_RECIPES = '[Recipes] Store recipes',
  ADD_RECIPE = '[Recipes] Add recipe',
  UPDATE_RECIPE = '[Recipes] Update recipe',
  DELETE_RECIPE = '[Recipes] Delete recipe',
}

export class SetRecipes implements Action {
  readonly type = RecipesActionTypes.SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = RecipesActionTypes.FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = RecipesActionTypes.STORE_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = RecipesActionTypes.ADD_RECIPE;
  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipesActionTypes.UPDATE_RECIPE;
  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipesActionTypes.DELETE_RECIPE;
  constructor(public payload: number) {}
}
export type RecipesActions =
  | SetRecipes
  | FetchRecipes
  | StoreRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe;
