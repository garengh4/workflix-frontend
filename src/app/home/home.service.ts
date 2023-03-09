import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { File } from '../models/file';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  baseURL:string = "http://localhost:3800/Workflix";

  getFilesByUserProfileId():Observable<File[]> {
    return this.http.get<File[]>(this.baseURL + "/file-api" + "files/userProfile/{userProfileId}/");
  }

}
