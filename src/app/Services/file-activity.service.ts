import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileActivityService {

  private api_url: string = "https://file-server-ben.onrender.com/server/files";

  constructor(private http: HttpClient) { }

  sendFileToEmail(file_id: number, email: string): Observable<any>{

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders(

      { 'Content-Type': 'application/json',
       'Authorization': `Token ${token}`}
    );

    return this.http.post(`${this.api_url}/${file_id}/${email}/email/`,{}, {headers})
  }

  downloadFile(file_id: number): Observable<any>{

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders(

      { 'Content-Type': 'application/json',
       'Authorization': `Token ${token}`}
    );


    return this.http.post(`${this.api_url}/${file_id}/download/`, {}, {headers})


  }
}
