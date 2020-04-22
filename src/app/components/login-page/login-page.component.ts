import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  errorMessage: string;
  loginForm: FormGroup;
  userSub: Subscription;
  constructor(private router: Router,
              private uService: UsersService,
              private lsService: LocalstorageService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
  get userName() {
    return this.loginForm.get('userName');
}
get password() {
  return this.loginForm.get('password');
}
  onSubmit() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.uService.login(userName, password);
    this.userSub =  this.uService.currentUser.subscribe(user => {
      if (!user) {
        this.showErrorMessage('Hibás jelszó vagy a felhasználónév már használatban van.');
      }
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3500);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
