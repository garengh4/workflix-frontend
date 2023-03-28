import { Component } from '@angular/core';
import { LoaderService } from './loading.service';

@Component({
    selector: 'app-loader',
    templateUrl: './loading.component.html',
    styleUrls: []

})

export class LoadingComponent {
    constructor(public loader: LoaderService) { }
}