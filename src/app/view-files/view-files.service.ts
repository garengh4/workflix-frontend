import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewFilesService {

  constructor(private http: HttpClient) { }

  downloadDoc(url: string, fileCategory: string): Observable<Blob> {
    const options = { responseType: 'blob' as 'json' };
    return this.http
   .get<Blob>(url, options)
   .pipe(map(res => new Blob([res], { type: fileCategory })));
 }
  
}
