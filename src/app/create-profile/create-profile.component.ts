import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/assets/entites/Profile';
import { CreateProfileService } from './create-profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  successMsg: string;
  errMsg: string;
  constructor(private fb: FormBuilder, private createProfileService: CreateProfileService, private router: Router) { }
  
  ngOnInit(): void {
    this.createProfileForm();
  }

  ProfileEntry: Profile = new Profile();
  profileForm: FormGroup;
  public createProfileForm() {
    this.profileForm = this.fb.group({
      emailId: [this.ProfileEntry.emailId, [Validators.required], null],
      firstName: [this.ProfileEntry.firstName, [Validators.required], null],
    })
  }
  public onCreateProfile(){
    this.errMsg = '';
    this.successMsg = '';
    this.ProfileEntry = this.profileForm.value as Profile;
    this.createProfileService.createProfile(this.ProfileEntry).subscribe({
      next: msg => {
        this.ProfileEntry = msg;
        this.router.navigate(['/profile'])

      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}
