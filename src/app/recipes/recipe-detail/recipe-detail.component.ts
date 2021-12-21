import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';
import { State } from 'src/app/shopping-list/store/shopping-list.reducer';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { DeleteRecipe } from '../store/recipes.actions';

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
    private router: Router,
    private store: Store<fromApp.AppState>
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

    // this.route.params.subscribe((params) => {
    //   this.id = +params['id'];
    //   this.recipe = this.rs.getRecipe(this.id);
    // });

    this.route.params
      .pipe(
        map((params) => params.id),
        switchMap((id) => {
          this.id = id;
          return this.store
            .select('recipes')
            .pipe(map((state) => state.recipes[id]));
        })
      )
      .subscribe((recipe) => {
        this.recipe = recipe;
      });
  }

  addToShoppingList() {
    // this.sls.addIngredients(this.recipe.ingredients);
    // console.log('ingredients: ' + JSON.stringify(this.recipe.ingredients));
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onDelete() {
    // this.rs.deleteRecipe(this.id);
    this.store.dispatch(new DeleteRecipe(this.id));
    // this.router.navigate(['..', { relativeTo: this.route }]);
    this.router.navigate(['/recipes']);
  }
}
