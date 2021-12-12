import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import { LoginStart } from './store/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;
  storeSub: Subscription;

  @ViewChild(PlaceholderDirective)
  alertHost: PlaceholderDirective;

  constructor(
    private as: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((state) => {
      this.isLoading = state.loading;
      this.error = state.errorMsg;

      if (this.error) this.showErrorAlert(this.error);
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) this.closeSub.unsubscribe();
    this.storeSub.unsubscribe();
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData> = null;

    this.isLoading = true;
    if (this.isLoginMode) {
      // authObs = this.as.login(email, password);
      this.store.dispatch(new LoginStart({ email, password }));
    } else {
      authObs = this.as.signup(email, password);
    }

    // authObs.subscribe(
    //   (res) => {
    //     // console.log(res);
    //     this.isLoading = false;

    //     this.router.navigate(['/recipes']);
    //   },
    //   (errMsg) => {
    //     // console.log(errMsg);
    //     this.error = errMsg;
    //     this.isLoading = false;

    //     // alert for programatic approach
    //     this.showErrorAlert(errMsg);
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCF = this.cfr.resolveComponentFactory(AlertComponent);

    this.alertHost.vcr.clear();
    const compRef = this.alertHost.vcr.createComponent(alertCF);

    compRef.instance.message = message;
    this.closeSub = compRef.instance.close.subscribe(() => {
      compRef.instance.close.unsubscribe();
      this.alertHost.vcr.clear();
    });
  }
}
