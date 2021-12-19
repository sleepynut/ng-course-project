import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export enum RecipesActionTypes {
  SET_RECIPES = '[Recipes] Set recipes',
}

export class SetRecipes implements Action {
  readonly type = RecipesActionTypes.SET_RECIPES;
  constructor(public payload: Recipe[]) {}
}

export type RecipesActions = SetRecipes;
