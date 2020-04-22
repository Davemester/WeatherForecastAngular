import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';
import { LocalstorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'encosoft-test-app';

  constructor(private usersService: UsersService,
              private lsService: LocalstorageService) {}
  ngOnInit(): void {
   if (this.lsService.getUsers()) {
    this.usersService.autologin();
   }
  }

  ngOnDestroy() {

  }

}
