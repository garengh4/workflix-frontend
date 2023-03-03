import { NgModule } from '@angular/core';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule( {
    imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatExpansionModule

    ],
    providers: [

    ]
} )

export class AngularMaterialModule { }