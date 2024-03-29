import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { Login } from "src/assets/entites/Login";
import { Profile } from "src/assets/entites/Profile";

import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class ProfileService {





    private loggedInData = new BehaviorSubject<Login>(JSON.parse(sessionStorage.getItem("loginEntry")));
    updatedCustomer = this.loggedInData.asObservable();















    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public getProfilesByLoginId(loginId: String): any{
        let url = environment.backendLoginAPI+"/profile-api/profiles/"+loginId;
        return this.http.get(url).pipe(catchError(this.handleError));;
    }

    public deleteProfile(profileId: string):any{
        let url=environment.backendLoginAPI+"/profile-api/delete/"+profileId;
        return this.http.delete(url, {responseType: "text"}).pipe(catchError(this.handleError));;
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