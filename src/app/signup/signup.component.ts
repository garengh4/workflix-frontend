import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Signup } from 'src/assets/entites/Signup';
import { LoginValidators } from 'src/assets/validators/LoginValidators';
import { SignUpService } from './signup.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
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
      loginId: [this.signupEntry.loginId, [Validators.required, Validators.email], null],
      confirmEmail: [this.signupEntry.confirmEmail, [Validators.required]],
      password: [this.signupEntry.password, [Validators.required], null],
      confirmPassword: ['', [Validators.required], null]

    });
    this.signupForm.get('confirmPassword').setValidators([Validators.required,LoginValidators.confirmPassword(this.signupForm.get('password'))]);

  }




  public onSignup() {
    this.errMsg = '';
    this.successMsg = '';
    this.signupEntry = this.signupForm.value as Signup;
    this.signUpService.registerLogin(this.signupEntry).subscribe({
      next: msg => {
        this.signupEntry = msg;
        console.log("-------------------------------")
        console.log(msg)
        console.log("-------------------------------")

        this.router.navigate(['/login'])

      }, error: msg => {
        this.errMsg = <any>msg;
        console.log("-------------------------------")
        console.log(this.errMsg)
        console.log("-------------------------------")
      }
    })
  }
}

  
