import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;

  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private rs: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];

      this.initForm();
    });
  }

  initForm() {
    let name: string;
    let path: string;
    let desc: string;
    let ing = new FormArray([]);

    if (!isNaN(this.id)) {
      let recipe: Recipe = this.rs.getRecipe(this.id);
      name = recipe.name;
      path = recipe.imagePath;
      desc = recipe.description;

      if (recipe.ingredients)
        for (let i of recipe.ingredients) {
          ing.push(
            new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount, [
                Validators.required,
                Validators.pattern(/^[1-9][0-9]*$/),
              ]),
            })
          );
        }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(path, Validators.required),
      description: new FormControl(desc, Validators.required),
      ingredients: ing,
    });
  }

  onSubmit() {
    if (isNaN(this.id)) this.addRecipe();
    else this.updateRecipe();

    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9][0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(ingredientIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientIndex);
    this.rs.deleteIngredient(this.id, ingredientIndex);
  }

  addRecipe() {
    this.rs.addRecipe(this.recipeForm.value);
  }

  updateRecipe() {
    this.rs.updateRecipe(this.id, this.recipeForm.value);
  }
}
