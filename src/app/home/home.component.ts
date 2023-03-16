import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/assets/entites/Profile';
import { File } from '../models/file';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  errorMessage: string = "";

  files: File[];
  currentUserProfileId:string;
  currentProfileName:string = "";

  logout():void {
    localStorage.setItem("loginId","");
    localStorage.setItem("isLoggedIn","false");
    localStorage.setItem("currentProfileId","");
  }

  switchProfile():void {
    localStorage.setItem("currentProfileId", "");
    localStorage.setItem("currentProfileName", "");
  }

  ngOnInit():void {

    this.currentUserProfileId = localStorage.getItem("currentProfileId"); 
    this.currentProfileName = localStorage.getItem("currentProfileName");

    this.homeService.getFilesByUserProfileId(this.currentUserProfileId).subscribe({
      next: files => {
        this.files = files;
        this.errorMessage = "";
      },
      error: err => {
        this.errorMessage = err.error.errorMessage;
      }
    }
      
    )
  }

}
