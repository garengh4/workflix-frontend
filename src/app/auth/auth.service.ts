import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import { Login } from 'src/assets/entites/Login';



@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    private headers = new HttpHeaders({ 'Content-Type': 'application/json'});
    constructor(private http: HttpClient) { }

    public authenticateLogin(login: Login): Observable<any> {
        let url = environment.backendLoginAPI+"/auth/login";
        return this.http.post(url, {loginId: login.loginId, password: login.password},{headers: this.headers}).pipe(catchError(this.handleError));;
    }

    public logout(): void {
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("currentProfileId", "");
        localStorage.removeItem("access_token");
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err)
        let errMsg:string='';
        if (err.error instanceof Error) {   
            errMsg=err.error.message;
            console.log(errMsg)
        }
         else if(typeof err.error === 'string'){
            errMsg = JSON.parse(err.error).errorMessage
        }
        else {
           if(err.status==0){ 
               errMsg="A connection to back end can not be established.";
           }else{
            errMsg = err.error.errorMessage;
           }
         }
            return throwError(errMsg);
    }
  }