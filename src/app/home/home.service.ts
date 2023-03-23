import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from 'src/assets/entites/FileModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  baseURL:string = "http://localhost:3800/workflix"; 

  getFilesByUserProfileId(userProfileId:string):Observable<FileModel[]> {
    return this.http.get<FileModel[]>(this.baseURL + "/file-api/" + "files/userProfile/" + userProfileId +"/");
  }

  uploadFile(formData:FormData):Observable<string> {
    return this.http.post<string>(environment.backendLoginAPI + "/file-api/" + "upload", formData);
  }

}
