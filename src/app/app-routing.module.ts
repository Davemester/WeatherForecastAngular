import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { AutologinGuardService } from './services/autologin-guard.service';


const routes: Routes = [
  {path: '', component: LoginPageComponent, pathMatch: 'full', canActivate: [AutologinGuardService]},
  {path: 'login-page', component: LoginPageComponent, canActivate: [AutologinGuardService]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
