import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSub: Subscription;

  // @Input()
  // recipe:Recipe

  constructor(
    private rs: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.recipes = this.rs.getRecipes();
    // this.recipeSub = this.rs.changedRecipes.subscribe((changedRecipes) => {
    //   this.recipes = changedRecipes;
    // });
    this.recipeSub = this.store
      .select('recipes')
      .pipe(map((state) => state.recipes))
      .subscribe((recipes) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
