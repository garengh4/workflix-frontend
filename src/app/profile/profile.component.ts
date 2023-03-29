import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/assets/entites/Profile';
import { LoaderService } from '../../assets/loading/loading.service';
import { AuthService } from '../auth/auth.service';
import { ProfileService } from './profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  profiles: Profile[];
  profileId: string;
  successMsg: string;
  errMsg: string;

  private helper = new JwtHelperService();

constructor(private profileService: ProfileService, private router: Router, private auth: AuthService, public loader: LoaderService){}


  ngOnInit(): void {
    this.getProfileByEmail();
  }
  
  public deleteProfile(profile: Profile) {
    if (confirm("Are you sure you want to delete " + profile.firstName + " " + profile.lastName + "'s profile?")) {
      this.profileService.deleteProfile(profile.profileId).subscribe({
        next: msg => {
          this.successMsg = msg;
          window.alert(this.successMsg);
          this.getProfileByEmail();

        }, error: msg => {
          this.errMsg = msg;
        }
      })
    }
  }

  public logout():void{
    this.auth.logout();
  }

  setCurrentProfileId(profileId: string): void {
    localStorage.setItem("currentProfileId", profileId);
  }

  public getProfileByEmail() {
    const decodedToken = this.helper.decodeToken(localStorage.getItem('access_token'));
    this.profileService.getProfilesByLoginId(decodedToken.sub).subscribe({
      next: data => {
        this.profiles = data;
        console.log(this.profiles)
      }
    }
    )
  }
}

