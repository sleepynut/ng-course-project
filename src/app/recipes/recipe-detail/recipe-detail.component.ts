import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;

  id: number;

  constructor(
    private sls: ShoppingListService,
    private route: ActivatedRoute,
    private rs: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.rs.selectedRecipe.subscribe(
    //   (recipe:Recipe) => {
    //     this.recipe = recipe;
    //   }
    // )
    // this.route.data.subscribe((data) => {
    //   this.recipe = data['recipe'];
    // });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.recipe = this.rs.getRecipe(this.id);
    });
  }

  addToShoppingList() {
    this.sls.addIngredients(this.recipe.ingredients);
  }

  onDelete() {
    this.rs.deleteRecipe(this.id);
    this.router.navigate(['..', { relativeTo: this.route }]);
  }
}
