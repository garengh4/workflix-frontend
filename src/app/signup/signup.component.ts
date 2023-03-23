import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/assets/entites/Signup';
import { LoaderService } from '../../assets/loading/loading.service';
import { SignUpService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  successMsg: string;
  errMsg: string;

  constructor(private fb: FormBuilder, private signUpService: SignUpService, private router: Router, public loader: LoaderService) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  signupEntry: Signup = new Signup();
  signupForm: FormGroup;
  public createSignUpForm() {
    this.signupForm = this.fb.group({
      loginId: [this.signupEntry.loginId, [Validators.required, Validators.email], null],
      confirmLogin: [this.signupEntry.confirmLogin, [Validators.required, this.matchValues('loginId')]],
      password: [this.signupEntry.password, [Validators.required, Validators.minLength(8), this.passwordStrengthValidator], null],
      confirmPassword: [this.signupEntry.confirmPassword, [this.matchValues('password')]]
    });
  }

  passwordStrengthValidator(control: FormControl): { [key: string]: boolean } | null {
    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value);
    const hasUpperCase = /[A-Z]/.test(control.value);
    const passwordValid = hasSpecialCharacter && hasUpperCase;
    return passwordValid ? null : { passwordStrength: true };
  }

  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      const value = control.value;

      return value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    };
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

  
