import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AccountService} from '../../account/account.service';
import {ICurrentUser} from '../../shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser$: Observable<ICurrentUser>;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout(): void {
    this.accountService.logout();
  }
}