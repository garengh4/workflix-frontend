import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Categories } from "src/assets/entites/Categories";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class AddCategoriesService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public addCategories(categoriesEntry: Categories): Observable<Categories> {
        let url = environment.backendLoginAPI+"/category-api/create";
        return this.http.post<Categories>(url, categoriesEntry, { headers: this.headers }).pipe(catchError(this.handleError));;

    }
    private handleError(err: HttpErrorResponse) {
        console.log("Coming into error");
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
