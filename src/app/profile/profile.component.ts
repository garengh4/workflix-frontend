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

  public getProfileByEmail() {
        this.profileService.getProfileByEmail(localStorage.getItem('emailId')).subscribe({
          next: data =>{
            this.profiles =data;
          }

        }
        )
      }
    }

