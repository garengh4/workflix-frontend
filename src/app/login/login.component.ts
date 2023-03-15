import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/assets/entites/Login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  successMsg: string;
  errMsg: string;
  isLoggedIn: boolean;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  // =============Init=============================================================================
  loginEntry: Login = new Login();
  loginForm: FormGroup;
  public createLoginForm() {
    this.loginForm = this.fb.group({
      loginId: [this.loginEntry.loginId, [Validators.required], null],
      password: [this.loginEntry.password, [Validators.required, Validators.minLength(5), this.passwordStrengthValidator], null],
    });
  }
  passwordStrengthValidator(control: FormControl): { [key: string]: boolean } | null {
    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(control.value);
    const hasUpperCase = /[A-Z]/.test(control.value);
    const passwordValid = hasSpecialCharacter && hasUpperCase;
    return passwordValid ? null : { passwordStrength: true };
  }

  // ===============To Html=================================================================================
  public onLogin() {
    this.errMsg = '';
    this.successMsg = '';
    this.loginEntry = this.loginForm.value as Login;
    this.loginService.authenticateLogin(this.loginEntry).subscribe({
      next: msg => {
        this.loginEntry = msg;
        localStorage.setItem('emailId',<string>this.loginEntry.loginId);
        localStorage.setItem('isLoggedIn',"true");
        this.router.navigate(['/profile']);

      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}
