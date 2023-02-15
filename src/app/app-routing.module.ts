import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { enterComponent } from "./enter/enter.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
  { path: '', redirectTo:'enter', pathMatch:'full' },
  { path: 'enter', component: enterComponent },
  { path: 'enter/login', component:LoginComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'profile/home', component:HomeComponent},



]

@NgModule({
    declarations:[],
    imports:[
        RouterModule.forRoot(routes)
      ],
      exports:[
        RouterModule
      ]
})

export class AppRoutingModule {}
