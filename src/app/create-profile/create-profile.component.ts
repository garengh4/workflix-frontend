import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Profile } from 'src/assets/entites/Profile';
import { LoaderService } from '../../assets/loading/loading.service';
import { CreateProfileService } from './create-profile.service';
import { JwtHelperService } from '@auth0/angular-jwt';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  successMsg: string;
  errMsg: string;

  private helper = new JwtHelperService();
  

  constructor(private fb: FormBuilder, private createProfileService: CreateProfileService, private router: Router, public loader:LoaderService) { }
  
  ngOnInit(): void {
    this.createProfileForm();
  }

  ProfileEntry: Profile = new Profile();
  profileForm: FormGroup;
  public createProfileForm() {
    this.profileForm = this.fb.group({
      loginId:  [(this.helper.decodeToken(localStorage.getItem('access_token'))).sub.toLowerCase()],
      profileId: [this.ProfileEntry.profileId, [Validators.required], null],
      firstName: [this.ProfileEntry.firstName, [Validators.required], null],
      lastName: [this.ProfileEntry.lastName,[Validators.required],null]


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
