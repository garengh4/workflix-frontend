import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Blog } from "src/assets/entites/Blog";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BlogPageService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  public saveBlog(blogPageEntry: Blog): Observable<Blog> {
    console.log("Sending to backend" + blogPageEntry);
    let url = environment.backendLoginAPI + "/post-api/create";
    return this.http.post<Blog>(url, blogPageEntry, { headers: this.headers }).pipe(catchError(this.handleError));;

  }
  private handleError(err: HttpErrorResponse) {
    console.log(err)
    let errMsg: string = '';
    if (err.error instanceof Error) {
      errMsg = err.error.message;
      console.log(errMsg)
    }
    else if (typeof err.error === 'string') {
      errMsg = JSON.parse(err.error).errorMessage
    }
    else {
      if (err.status == 0) {
        errMsg = "A connection to back end can not be established.";
      } else {
        errMsg = err.error.errorMessage;
      }
    }
    return throwError(errMsg);
  }
}
