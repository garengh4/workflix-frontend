
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EnterComponent } from './enter/enter.component';
import { AuthGuard } from './auth/auth.guard';
import { ViewFilesComponent } from './view-files/view-files.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  // { path: 'heroes', component: HeroesComponent }
  { path: '', redirectTo:'enter', pathMatch:'full'},
  { path: 'signup', component:  SignUpComponent},
  { path: 'create-profile', component:  CreateProfileComponent, canActivate: [AuthGuard]},
  { path: 'home', component:  HomeComponent,canActivate: [AuthGuard] },
  { path: 'login', component:  LoginComponent},
  { path: 'profile', component:  ProfileComponent, canActivate: [AuthGuard]},
  { path: 'enter', component:  EnterComponent},
  { path: 'viewFiles', component: ViewFilesComponent, canActivate: [AuthGuard]},
  { path: 'blog', component:  BlogComponent},
  { path: 'blog-page', component:  BlogPageComponent},
  { path: 'categories', component:  CategoriesComponent},
  { path: 'add-categories', component:  AddCategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }