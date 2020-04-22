import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCityDialogComponent } from '../add-city-dialog/add-city-dialog.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Subscription } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('tabRef', { static: false }) tabRef: MatTabGroup;
  user: User;
  userSub: Subscription;
  constructor(private dialog: MatDialog,
              private userService: UsersService,
              private lsService: LocalstorageService ) { }

  ngOnInit(): void {
   this.userSub =  this.userService.currentUser.subscribe((user: User) => {
      this.user = user;
    });
  }

  logChange(index: number) {
  }

  openDialog() {
    const dialogref = this.dialog.open(AddCityDialogComponent, {
    } );
    dialogref.afterClosed().subscribe(city => {
      if (city) {
        this.user.cities.push(city);
        this.lsService.updateUser(this.user);
        const lastTabIndex = this.tabRef._allTabs.length - 1;
        this.tabRef.selectedIndex = lastTabIndex;

      }
    });
  }

  deleteTab(city: string) {
    this.user.cities.splice(this.user.cities.indexOf(city), 1);
    this.lsService.updateUser(this.user);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
