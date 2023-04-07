import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private http : HttpClient,private router : Router) { }

  signup(user : User) : Observable<User>
  {
    return this.http.post<User>('https://localhost:7108/api/Auth/sign-up',user);
  }
  signin(user : User) : Observable<User>
  {
    return this.http.post<User>('https://localhost:7108/api/Auth/sign-in',user);
  }
  logout(navigateTo : string) : void{
    localStorage.removeItem('user');
    if(navigateTo)
      this.router.navigateByUrl(navigateTo);
    else 
      this.router.navigateByUrl('/');
  }
  checktoken(user : User) : Observable<User> {
    return this.http.post<User>('https://localhost:7108/api/Auth/check-token',user);
  }
}
