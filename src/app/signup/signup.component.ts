import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/assets/entites/Signup';
import { SignUpService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  successMsg: string;
  errMsg: string;

  constructor(private fb: FormBuilder, private signUpService: SignUpService, private router: Router) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  signupEntry: Signup = new Signup();
  signupForm: FormGroup;
  public createSignUpForm() {
    this.signupForm = this.fb.group({
      emailId: [this.signupEntry.emailId, [Validators.required], null],
      password: [this.signupEntry.password, [Validators.required], null],
    });
  }

  public onSignup() {
    this.errMsg = '';
    this.successMsg = '';
    this.signupEntry = this.signupForm.value as Signup;
    this.signUpService.registerLogin(this.signupEntry).subscribe({
      next: msg => {
        this.signupEntry = msg;
        this.router.navigate(['/login'])

      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}

  
