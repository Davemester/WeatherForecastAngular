import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public currentUser = new BehaviorSubject<User>(null);
  constructor(private lsService: LocalstorageService) { }

  login(name: string, password: string) {
    // megvizsgáljuk, hogy van e User a databaseben vagy már regisztrált-e
    if (!this.lsService.getUsers() || !this.isRegisteredUser(name) ) {
      this.register(name, password);
      return;
     }
     // ha van egyező nevű user, és a jelszava is stimmel, belogolhat
    this.lsService.getUsers().forEach((user: User) => {
      if (user.userName === name) {
          if (this.isCorrectPassword(password, user)) {
            user.isLoggedIn = true;
            this.lsService.updateUser(user);
            this.currentUser.next(user);
            return;
           }
        }
      });
  }

  register(name: string, password: string) {
    const passwordSalt = `${Math.random() }`;
    const passwordHash = btoa(`${password}${passwordSalt}`);
    const user: User = {
        userName: name,
        passwordSalt,
        passwordHash,
        isLoggedIn: true,
        cities: [],
      };
    this.lsService.saveNewUser(user);
    this.currentUser.next(user);
  }
  logout() {
   return this.currentUser.pipe(map((user: User) => {
     if (!!user) {
      user.isLoggedIn = false;
      this.lsService.updateUser(user);
      this.currentUser.next(null);
     }
    }));
  }
  isCorrectPassword(password: string,  user: User): boolean {
      const decodedHash = atob(user.passwordHash);
      return decodedHash === `${password}${user.passwordSalt}`;
  }
  isRegisteredUser(name: string) {
    const userNameList = [];
    this.lsService.getUsers().forEach((user: User) => {
      userNameList.push(user.userName);
    });
    return userNameList.includes(name);
  }

  autologin() {
   const lastLoggedUser = this.lsService.getUsers().filter((user: User) => {
    return user.isLoggedIn;
    });

   if (lastLoggedUser.length === 1) {
    this.currentUser.next(lastLoggedUser[0]);
    this.lsService.updateUser(lastLoggedUser[0]);
   }

  }
}
