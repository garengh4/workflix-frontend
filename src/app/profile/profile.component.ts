import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/assets/entites/Profile';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profiles: Profile[];

  constructor(private profileService: ProfileService, private router: Router){}

  ngOnInit(): void {
    this.getProfileByEmail();
  }
  

  setCurrentProfileId(profileId:string):void {
    localStorage.setItem("currentProfileId",profileId);
  }

  public logout():void {
    localStorage.setItem("loginId","");
    localStorage.setItem("isLoggedIn","false");
    localStorage.setItem("currentProfileId",""); 

  }

  public getProfileByEmail() {
    this.profileService.getProfilesByLoginId(localStorage.getItem('loginId')).subscribe({
      next: data =>{
        this.profiles =data;
      }
    }
    )
  }
}

