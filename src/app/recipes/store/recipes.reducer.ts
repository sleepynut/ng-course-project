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
        recipes: action.payload ? [...action.payload] : [],
      };
    case RecipesActionTypes.ADD_RECIPE:
      console.log('Recipe: ' + JSON.stringify(action.payload));
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case RecipesActionTypes.UPDATE_RECIPE:
      const newRecipes = [...state.recipes];
      newRecipes[action.payload.index] = action.payload.newRecipe;
      return {
        ...state,
        recipes: newRecipes,
      };
    case RecipesActionTypes.DELETE_RECIPE:
      // console.log('deleted');
      // console.log('payload: ' + action.payload);
      // console.log(
      //   'recipes: ' +
      //     JSON.stringify(
      //       state.recipes.filter((_, index) => index != action.payload)
      //     )
      // );
      return {
        ...state,
        recipes: state.recipes.filter((_, index) => index != action.payload),
      };
    default:
      // console.log('Recipe: ' + JSON.stringify(action));
      return state;
  }
}
