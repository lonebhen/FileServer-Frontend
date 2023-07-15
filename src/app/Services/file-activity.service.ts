import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileActivityService {

  private api_url: string = "http://localhost:8000/files";

  constructor(private http: HttpClient) { }

  sendFileToEmail(file_id: number, email: string): Observable<any>{

    const token = localStorage.getItem('token')
    // const payload = {file_id: file_id, email: email}

    const headers = new HttpHeaders(

      { 'Content-Type': 'application/json',
       'Authorization': `Token ${token}`}
    );

    return this.http.post(`${this.api_url}/${file_id}/${email}/email/`, {headers})
  }
}