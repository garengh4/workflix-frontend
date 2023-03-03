
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EnterComponent } from './enter/enter.component';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent }
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'signup', component:  SignUpComponent},
  { path: 'create-profile', component:  CreateProfileComponent},
  { path: 'home', component:  HomeComponent },
  { path: 'login', component:  LoginComponent},
  { path: 'profile', component:  ProfileComponent},
  { path: 'enter', component:  EnterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }