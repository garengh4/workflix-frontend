import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';



@NgModule( {
    imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatButtonModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatButtonModule
    ],
    providers: [

    ]
} )

export class AngularMaterialModule { }