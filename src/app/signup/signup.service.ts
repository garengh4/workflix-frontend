import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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
        return this.http.post<Signup>(url, signup, { headers: this.headers });;
    }
}
