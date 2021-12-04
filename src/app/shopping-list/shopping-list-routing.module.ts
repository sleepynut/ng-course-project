import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
  { path: '**', redirectTo: 'page-not-found' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingListRoutingModule {}
