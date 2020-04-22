import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;

  constructor(private router: Router,
              public userS: UsersService) { }
  ngOnInit(): void {

  }
  logout() {
    this.userSub = this.userS.logout().subscribe();
    this.router.navigate(['/login-page']);

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
