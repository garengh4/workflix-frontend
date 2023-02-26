import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  // =============Init=============================================================================
  loginEntry: Login = new Login();
  loginForm: FormGroup;
  public createLoginForm() {
    this.loginForm = this.fb.group({
      emailId: [this.loginEntry.emailId, [Validators.required], null],
      password: [this.loginEntry.password, [Validators.required], null],
    });
  }

  // ===============To Html=================================================================================
  public onLogin() {
    this.errMsg = '';
    this.successMsg = '';
    this.loginEntry = this.loginForm.value as Login;
    this.loginService.authenticateLogin(this.loginEntry).subscribe({
      next: msg => {
        this.loginEntry = msg;
        // TODO: most likely going to be bug here from routing. check.
        sessionStorage.setItem('loginEntry', JSON.stringify(this.loginEntry))
        this.router.navigate(['/home'])

      }, error: msg => {
        this.errMsg = <any>msg;
      }
    })
  }
}
