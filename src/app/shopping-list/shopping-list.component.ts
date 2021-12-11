import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SelectIngredient } from './store/shopping-list.actions';
import { State } from './store/shopping-list.reducer';
import * as fromApp from '../store/app.reducer';
// import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<State>;
  constructor(
    // private sla: ShoppingListService,
    private store: Store<fromApp.AppState> // Store<{A:B}> --> A: storeArea & B: type that storeArea yields
  ) {}

  ngOnInit(): void {
    // this.ingredients = this.sls.ingredients;
    this.ingredients = this.store.select('shoppingList');
  }

  onEdit(i: number) {
    // this.sls.selectedIndex.next(i);
    this.store.dispatch(new SelectIngredient(i));
  }
}
