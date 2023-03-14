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

  ngOnInit():void {

    this.currentUserProfileId = JSON.parse(sessionStorage.getItem("currentProfile")); //Note: Make sure we're storing this

    this.homeService.getFilesByUserProfileId(this.currentUserProfileId).subscribe(
      files => {
        this.files = files;
        this.errorMessage = "";
      },
      err => {
        this.errorMessage = err.error.errorMessage;
      }
    )
  }

}
