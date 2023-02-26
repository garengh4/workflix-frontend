import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "src/assets/entites/Login";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public authenticateLogin(login: Login): Observable<Login> {
        // TODO: must match backend API. Edit environment.ts
        let url = environment.backendLoginAPI;
        return this.http.post<Login>(url, login, { headers: this.headers });

    }
}