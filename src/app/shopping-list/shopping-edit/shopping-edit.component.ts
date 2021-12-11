import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import {
  AddIngredient,
  DeleteIngredient,
  DeselectIngredient,
  EditIngredient,
} from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput')
  // nameInput:ElementRef;

  // @ViewChild('amountInput')
  // amountInput:ElementRef;
  sub: Subscription;

  @ViewChild('f', { static: false })
  slForm: NgForm;

  selIndex: number;

  constructor(
    // private sls: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.sub = this.sls.selectedIndex.subscribe((i: number) => {
    //   this.selIndex = i;

    //   if (i != null && i >= 0) {
    //     let ing = this.sls.getIngredient(i);
    //     this.slForm.setValue({
    //       name: ing.name,
    //       amount: ing.amount,
    //     });
    //   }
    // });
    this.sub = this.store.select('shoppingList').subscribe((s) => {
      this.selIndex = s.selIngredient;
      console.log('selected index: ' + this.selIndex);
      if (this.selIndex != null && this.selIndex >= 0) {
        console.log('ingredients: ' + JSON.stringify(s.ingredients));
        let ing = s.ingredients[this.selIndex];
        console.log('slform: ' + this.slForm);
        this.slForm.setValue(ing);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.store.dispatch(new DeselectIngredient());
  }

  onSubmit(f: NgForm) {
    if (this.selIndex == null) {
      let i = f.value;
      // this.sls.addIngredient(new Ingredient(i.name, i.amount));
      this.store.dispatch(new AddIngredient(new Ingredient(i.name, i.amount)));
    } else {
      // this.sls.updateIngredient(
      //   this.selIndex,
      //   this.slForm.value.name,
      //   this.slForm.value.amount
      // );
      this.store.dispatch(
        new EditIngredient(
          new Ingredient(this.slForm.value.name, this.slForm.value.amount)
        )
      );
    }

    this.slForm.reset();
    // this.sls.selectedIndex.next(null);
    this.store.dispatch(new DeselectIngredient());
  }

  onDelete() {
    // console.log('Before:' + JSON.stringify(this.sls.ingredients));
    // this.sls.deleteIngredient(this.selIndex);
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
    // this.sls.selectedIndex.next(null);
    // console.log('After:' + JSON.stringify(this.sls.ingredients));
  }

  onClear() {
    this.slForm.reset();
    // this.selIndex = null;
    this.store.dispatch(new DeselectIngredient());
    // console.log('this.selIndex: ' + this.selIndex);
  }
}
