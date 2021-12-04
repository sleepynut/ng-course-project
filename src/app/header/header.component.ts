import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private ds: DataStorageService, private as: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.as.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      // console.log('!user ' + !user);
      // console.log('!!user ' + !!user);
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
