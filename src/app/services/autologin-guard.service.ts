import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutologinGuardService implements CanActivate {

  constructor(private userService: UsersService,
              private router: Router) {}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.currentUser.pipe(take(1), map(user => {
      if (!!user && user.isLoggedIn ) {
        this.router.navigate(['/home']);
      } else {
        return true;
    }
    }));
    }
}
