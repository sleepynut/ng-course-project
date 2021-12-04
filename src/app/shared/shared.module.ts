import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
