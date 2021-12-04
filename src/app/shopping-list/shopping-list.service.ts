import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  selectedIndex = new Subject<number>();

  constructor() {}

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(i: number): Ingredient {
    return this.ingredients[i];
  }

  updateIngredient(i: number, name: string, amount: number) {
    this.ingredients[i].name = name;
    this.ingredients[i].amount = amount;
  }

  deleteIngredient(i: number) {
    this.ingredients.splice(i, 1);
  }
}
