import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import { FetchRecipes, RecipesActionTypes } from './store/recipes.actions';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(
    private ds: DataStorageService,
    private rs: RecipeService,
    private store: Store<fromApp.AppState>,
    private action$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    // let recipes = this.rs.getRecipes();
    // if (recipes.length == 0) {
    //   return this.ds.fetchRecipes();

    // }
    // return recipes;

    return this.store.select('recipes').pipe(
      take(1),
      map((state) => state.recipes),
      switchMap((recipes) => {
        if (recipes && recipes.length > 0) return of(recipes);
        else {
          this.store.dispatch(new FetchRecipes());
          return this.action$.pipe(
            ofType(RecipesActionTypes.SET_RECIPES),
            take(1)
          );
        }
      })
    );

    // this.store.dispatch(new FetchRecipes());
    // return this.action$.pipe(ofType(RecipesActionTypes.SET_RECIPES), take(1));
  }
}
