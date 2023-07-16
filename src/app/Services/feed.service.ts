import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private api_url: string = "https://file-server-ben.onrender.com/server"; 

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }


  getFiles(): Observable<any>{

    const token = this.authService.getToken()

    const headers = new HttpHeaders(
      { 'Content-Type': 'application/json',
       'Authorization': `Token ${token}`}
    );

    return this.http.get(`${this.api_url}/files/`, { headers })



  }
}
