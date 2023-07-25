import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private api_url: string = "https://file-server-ben.onrender.com/auth"

  private api_url: string = "https://file-server-ben.onrender.com/auth"

  private password_reset_api_url: string = "https://file-server-ben.onrender.com/api/password_reset"

  constructor(private http: HttpClient, private router: Router) {}


  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken():string|null{
    return localStorage.getItem('token')
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login')

  }


  login(email: string, password:string): Observable<any>{

    const loginData = {email: email, password: password}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.api_url}/login/`, loginData, { headers })
    
  }

  signup( email: string, password1:string, password2): Observable<any>{
    const signUpData = {email: email, password1: password1, password2: password2}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.api_url}/signup/`, signUpData, { headers })
  }


  reset(email: string):Observable<any>{
    const resetData = {email: email}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.password_reset_api_url}/`, resetData, {headers} )
   }

   
   
}
