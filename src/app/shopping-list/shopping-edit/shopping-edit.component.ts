import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
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

  @ViewChild('f')
  slForm: NgForm;

  selIndex: number;

  constructor(private sls: ShoppingListService) {}

  ngOnInit(): void {
    this.sub = this.sls.selectedIndex.subscribe((i: number) => {
      this.selIndex = i;

      if (i != null && i >= 0) {
        let ing = this.sls.getIngredient(i);
        this.slForm.setValue({
          name: ing.name,
          amount: ing.amount,
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(f: NgForm) {
    if (this.selIndex == null) {
      let i = f.value;
      this.sls.addIngredient(new Ingredient(i.name, i.amount));
    } else {
      this.sls.updateIngredient(
        this.selIndex,
        this.slForm.value.name,
        this.slForm.value.amount
      );
    }

    this.slForm.reset();
    this.sls.selectedIndex.next(null);
  }

  onDelete() {
    // console.log('Before:' + JSON.stringify(this.sls.ingredients));
    this.sls.deleteIngredient(this.selIndex);
    this.slForm.reset();
    this.sls.selectedIndex.next(null);
    // console.log('After:' + JSON.stringify(this.sls.ingredients));
  }

  onClear() {
    this.slForm.reset();
    this.selIndex = null;
  }
}
