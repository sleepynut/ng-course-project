import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe[]> {
  constructor(private ds: DataStorageService, private rs: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> | Recipe[] {
    let recipes = this.rs.getRecipes();
    if (recipes.length == 0) return this.ds.fetchRecipes();
    return recipes;
  }
}
