import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolver implements Resolve<Recipe> {
  constructor(private rs:RecipeService){}

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<Recipe> | Promise<Recipe> | Recipe {
    
      return this.rs.getRecipe(+route.params['id']);
  }
}
