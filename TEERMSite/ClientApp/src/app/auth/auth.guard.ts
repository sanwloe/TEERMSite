import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { translate } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = JSON.parse(localStorage.getItem('user')!);
    let jwthelperservice = new JwtHelperService(); 
    if(user!=null && user.token !=null && !jwthelperservice.isTokenExpired(user.token))
    {
      let roles = route.data['permittedRoles'] as Array<string>;

      if(user.role!=null && roles.length > 0 && roles.includes(user.role.name)){
        return true;
      }
      
    }
    alert(translate('auth.guard.right'));
    
    return false;
    
  
}
}
