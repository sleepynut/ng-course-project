import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipesActionTypes, SetRecipes } from './recipes.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActionTypes.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://ng-course-recipe-book-3ca99-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json'
      );
    }),
    map((recipes) => {
      if (recipes)
        recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });

      return new SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActionTypes.STORE_RECIPES),
    withLatestFrom(
      this.store.select('recipes').pipe(map((state) => state.recipes))
    ),
    switchMap(([_, recipes]) => {
      return this.http.put(
        'https://ng-course-recipe-book-3ca99-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
        recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
