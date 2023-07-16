import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_url: string = "https://file-server-ben.onrender.com/auth"

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

  signup(username: string, email: string, password:string): Observable<any>{
    const signUpData = {username: username, email: email, password: password}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.api_url}/signup/`, signUpData, { headers })
  }


  reset(username: string, new_password:string):Observable<any>{
    const resetData = {username: username, new_password: new_password}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.api_url}/pass-reset/`, resetData, {headers} )
   }

   


   


   
}
