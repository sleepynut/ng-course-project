import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  changedRecipes = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem placeat maxime obcaecati voluptatem architecto, enim ea tenetur ab voluptatibus? Mollitia sapiente unde molestiae repellendus officiis debitis dolores voluptate inventore.',
  //     'https://media.istockphoto.com/photos/italian-food-pasta-recipes-and-ingredients-as-and-tomato-and-fusilli-picture-id1309617405?s=612x612',
  //     [new Ingredient('Meat', 1), new Ingredient('Fries', 2)]
  //   ),
  //   new Recipe(
  //     'A test recipe2',
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem placeat maxime obcaecati voluptatem architecto, enim ea tenetur ab voluptatibus? Mollitia sapiente unde molestiae repellendus officiis debitis dolores voluptate inventore.',
  //     'https://kcp-wpengine.netdna-ssl.com/wp-content/uploads/2015/04/Sukiyaki-1.jpg',
  //     [new Ingredient('Bread', 4), new Ingredient('Beef', 10)]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  // selectedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.changedRecipes.next(this.getRecipes());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(i: number) {
    return this.recipes[i];
  }

  addRecipe(r: Recipe) {
    this.recipes.push(r);
    this.changedRecipes.next(this.getRecipes());
  }

  updateRecipe(i: number, r: Recipe) {
    this.recipes[i] = r;
    this.changedRecipes.next(this.getRecipes());
  }

  deleteRecipe(i: number) {
    // console.log('index: ' + i);
    this.recipes.splice(i, 1);

    this.changedRecipes.next(this.getRecipes());
    // console.log('after: ' + JSON.stringify(this.getRecipes()));
  }

  deleteIngredient(recipeIndex: number, ingredientIndex: number) {
    console.log('RecipeIndex: ' + recipeIndex);
    console.log('IngredientIndex: ' + ingredientIndex);
    this.recipes[recipeIndex].ingredients.splice(ingredientIndex, 1);

    console.log(
      'AFTER ingredient: ' +
        JSON.stringify(this.recipes[recipeIndex].ingredients)
    );
    this.changedRecipes.next(this.getRecipes());
  }
}
