import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users'));
  }

  updateUser(user: User) {
    const helpArray = this.getUsers().slice();
    helpArray.forEach( (item: User) => {
      if (user.userName === item.userName) {
          helpArray.splice(helpArray.indexOf(item), 1, user);
          localStorage.setItem('users', JSON.stringify(helpArray));
        }
      });
  }

  saveNewUser(user: User) {
    const usersArray = this.getUsers();
    if (!Array.isArray(usersArray)) {
      localStorage.setItem('users', JSON.stringify([user]));
    } else {
      usersArray.push(user);
      localStorage.setItem('users', JSON.stringify(usersArray));
    }
  }

}
