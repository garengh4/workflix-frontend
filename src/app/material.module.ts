import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';


@NgModule( {
    imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule
    ],
    providers: [

    ]
} )

export class AngularMaterialModule { }