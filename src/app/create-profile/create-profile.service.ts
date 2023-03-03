import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Profile } from "src/assets/entites/Profile";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CreateProfileService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    constructor(private http: HttpClient) { }

    public createProfile(profileEntry: Profile): Observable<Profile> {
        let url = environment.backendLoginAPI+"/login-api/login";
        return this.http.post<Profile>(url, profileEntry, { headers: this.headers });

    }
}