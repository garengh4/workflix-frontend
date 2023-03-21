import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/assets/entites/Profile';
import { LoaderService } from '../loading/loading.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{

profiles: Profile[];
profileId: string;
successMsg: string;
errMsg: string;


constructor(private profileService: ProfileService, private router: Router, public loader: LoaderService){}

ngOnInit(): void {
    this.getProfileByEmail();
  }
 
public deleteProfile(profile:Profile){
    if( confirm("Are you sure you want to delete "+profile.firstName + " " + profile.lastName+"'s profile?")){
      this.profileService.deleteProfile(profile.profileId).subscribe({
        next: msg => {
          this.successMsg = msg;
          window.alert(this.successMsg);
          this.getProfileByEmail();
        
        }, error: msg =>{
          this.errMsg=msg;
        }
      })
    }
  
}

  setCurrentProfileId(profileId:string):void {
    localStorage.setItem("currentProfileId",profileId);
  }

  setCurrentProfileName(profileName:string):void {
    localStorage.setItem("currentProfileName",profileName);
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

