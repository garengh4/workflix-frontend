import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Login } from 'src/assets/entites/Login';
import { LoaderService } from '../../assets/loading/loading.service';
import { LoginService } from './login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  successMsg: string;
  errMsg: string;
  isLoggedIn: boolean;

  constructor(private formbuilder: FormBuilder, private loginService: LoginService, private router: Router, public loader: LoaderService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  // =============Init=============================================================================
  loginEntry: Login = new Login();
  loginForm: FormGroup;
  public createLoginForm() {
    this.loginForm = this.formbuilder.group({
      loginId: [this.loginEntry.loginId, [Validators.required], null],
      password: [this.loginEntry.password, [Validators.required], null],
    });
  }
  // ===============To Html=================================================================================
  public onLogin() {
    this.errMsg = '';
    this.successMsg = '';
    this.loginEntry = this.loginForm.value as Login;
    this.loginEntry.loginId=this.loginEntry.loginId.toLowerCase();
    this.loginService.authenticateLogin(this.loginEntry).subscribe({
      next: msg => {
        console.log("caught");
        this.loginEntry = msg;
        localStorage.setItem('loginId',<string>this.loginEntry.loginId);
        localStorage.setItem('isLoggedIn',"true");
        this.router.navigate(['/profile']);

      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}
