import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EnterComponent } from './enter/enter.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './signup/signup.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingComponent } from '../assets/loading/loading.component';
import { LoadingInterceptor } from '../assets/interceptor/loading.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FilterByCategoryPipe } from './home/filter-by-category.pipe';
import { ViewFilesComponent } from './view-files/view-files.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const modules = [
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  ScrollingModule,
  NgxDocViewerModule
];

@NgModule({
  declarations: [
    AppComponent,
    EnterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    SignUpComponent,
    CreateProfileComponent,
    LoadingComponent,
    FilterByCategoryPipe,
    ViewFilesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    modules
  ],
  exports: [
    modules
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor, 
      multi:true}],
  bootstrap: [AppComponent]
})


export class AppModule { }
