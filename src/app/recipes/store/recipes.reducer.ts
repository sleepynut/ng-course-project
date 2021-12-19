import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipesActions, RecipesActionTypes } from './recipes.actions';

export const recipesFeatureKey = 'recipes';

export interface State {
  recipes: Recipe[];
}

export const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions
): State {
  switch (action.type) {
    case RecipesActionTypes.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    default:
      return state;
  }
}
