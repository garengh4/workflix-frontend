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

  getFilesByUserProfileId(userProfileId:string):Observable<FileModel[]> {
    return this.http.get<FileModel[]>(environment.backendLoginAPI + "/file-api/" + "files/userProfile/" + userProfileId +"/");
  }

  uploadFile(formData:FormData):Observable<string> {
    return this.http.post(environment.backendLoginAPI + "/file-api/" + "upload", formData, {responseType: 'text'});
  }

  deleteFile(fileName:string): Observable<string> {
    return this.http.delete(environment.backendLoginAPI + "/file-api/" + "file/delete/" + fileName + "/", {responseType: 'text'});
  }
}