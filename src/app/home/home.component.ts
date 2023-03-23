import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FileModel } from 'src/assets/entites/FileModel';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  numberOfTicks: any;

  constructor(private homeService:HomeService) { }


  errorMessage: string = "";

  files: FileModel[];

  currentUserProfileId: string;
  currentProfileName: string = "";

  getFilesByUserProfileId() {

    this.homeService.getFilesByUserProfileId(this.currentUserProfileId).subscribe({
      next: files => {
        this.files = files;
        this.errorMessage = "";
      },
      error: err => {
        this.errorMessage = err.message;
      }
    })
  }

  logout(): void {
    localStorage.setItem("loginId", "");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("currentProfileId", "");
  }

  switchProfile(): void {
    localStorage.setItem("currentProfileId", "");
    localStorage.setItem("currentProfileName", "");
  }

  ngOnInit(): void {

    this.currentUserProfileId = localStorage.getItem("currentProfileId");

    this.currentProfileName = localStorage.getItem("currentProfileName");

    this.getFilesByUserProfileId();

  }

}
