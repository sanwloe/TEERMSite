import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<User>(environment.BASEURI +  '/api/Auth/sign-up',user);
  }
  signin(user : User) : Observable<User>
  {
    return this.http.post<User>(environment.BASEURI + '/api/Auth/sign-in',user);
  }
  logout(navigateTo : string) : void{
    localStorage.removeItem('user');
    if(navigateTo)
      this.router.navigateByUrl(navigateTo);
    else 
      this.router.navigateByUrl('/');
  }
  checktoken(user : User) : Observable<User> {
    return this.http.post<User>(environment.BASEURI + '/api/Auth/check-token',user);
  }
  userupdateinfo(user : User) : Observable<User> {
    return this.http.post<User>(environment.BASEURI + '/api/Auth/user-update-info',user);
  }
  sendrecoverylink(user : User) : Observable<User>{
    return this.http.post<User>(environment.BASEURI + '/api/Auth/recovery-password',user);
  }
  resetpassword(user : User) : Observable<User>{
    return this.http.post<User>(environment.BASEURI + '/api/Auth/reset-password',user);
  }
  getusers(user : User) : Observable<User[]> {
    return this.http.post<User[]>(environment.BASEURI + '/api/Auth/get-all-users',user);
  }
  getuser(user : User) : Observable<User>{
    return this.http.post<User>(environment.BASEURI + '/api/Auth/get-user',user);
  }
  update(user : User[]) : Observable<User>{
    return this.http.put<User>(environment.BASEURI + '/api/Auth/update-user',user);
  }
  deleteuser(user : User[]) : Observable<User> {
    return this.http.post<User>(environment.BASEURI + '/api/Auth/delete-user',user);
  }
}
