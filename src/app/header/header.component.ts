import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private ds: DataStorageService,
    private as: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // this.userSub = this.as.user.subscribe((user) => {
    //   this.isAuthenticated = !!user;
    //   // console.log('!user ' + !user);
    //   // console.log('!!user ' + !!user);
    // });

    this.userSub = this.store
      .select('auth')
      .pipe(map((state) => state.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.ds.storeRecipes();
  }

  onFetchData() {
    this.ds.fetchRecipes().subscribe();
  }

  onLogout() {
    this.as.logout();
  }
}
