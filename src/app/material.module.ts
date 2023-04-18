import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule( {
    imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        ScrollingModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        
    ],
    exports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        ScrollingModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
    ],
    providers: [

    ]
} )

export class AngularMaterialModule { }