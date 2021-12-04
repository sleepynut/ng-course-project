import { Component, OnChanges, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit,OnChanges {
  // recipe:Recipe;
  constructor(private rs:RecipeService) { }

  ngOnInit(): void {
    // this.rs.selectedRecipe.subscribe(
    //   (recipe:Recipe) => {
    //     this.recipe = recipe;
    //   }
    // )
    // console.log(this.recipe);
  }
  
  ngOnChanges():void{
    // this.rs.selectedRecipe.subscribe(
    //   (recipe:Recipe) => {
    //     this.recipe = recipe;
    //   }
    // ) 
  }
  

}
