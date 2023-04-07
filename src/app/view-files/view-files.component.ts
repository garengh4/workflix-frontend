import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewFilesService } from './view-files.service';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {

  fileUrlToView: string;
  imageUrl: string[] = [localStorage.getItem("fileUrlToView")];
  isImageFile: boolean = JSON.parse(localStorage.getItem("isImageFile"));
  fileCategory: string = localStorage.getItem("fileCategory");

  constructor(private route: Router, private viewFilesService: ViewFilesService) { }

  ngOnInit(): void {
    this.fileUrlToView = localStorage.getItem("fileUrlToView");

    if (!this.isImageFile) {
      // localStorage.setItem('overrideToken', 'true'); //want to get rid of this ideally
      this.viewFilesService.downloadDoc(this.fileUrlToView, this.fileCategory).subscribe(res => {
        // localStorage.setItem('overrideToken', 'false'); //want to get rid of this ideally
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
      });
    }
  }

  goBack(): void {
    this.route.navigate(['home']);
  }

}