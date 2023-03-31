import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {

  fileUrlToView:string;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.fileUrlToView = localStorage.getItem("fileUrlToView");
  }

  goBack(): void {
    this.route.navigate(['home']);
  }

}
