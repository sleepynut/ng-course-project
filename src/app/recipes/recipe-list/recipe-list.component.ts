import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

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

  constructor(private rs: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.rs.getRecipes();
    this.recipeSub = this.rs.changedRecipes.subscribe((changedRecipes) => {
      this.recipes = changedRecipes;
    });
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }
}
