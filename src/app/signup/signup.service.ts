import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Signup } from "src/assets/entites/Signup";
import { environment } from "src/environments/environment";





@Injectable({
    providedIn: 'root'
})

export class SignUpService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public registerLogin(signup: Signup): Observable<Signup> {
        let url = environment.backendLoginAPI+"/login-api/register";
        return this.http.post<Signup>(url, signup, { headers: this.headers }).pipe(catchError(this.handleError));;
    }
    private handleError(err: HttpErrorResponse) {
        console.log(err);
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
