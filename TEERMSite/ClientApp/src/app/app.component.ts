import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { translate, TranslocoService } from '@ngneat/transloco';
import { AuthserviceService } from './auth/services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  publickey = '<RSAKeyValue><Modulus>yBtZIrfQf4iHm9hdR0CgsGVScN2peR7kEyG0wlQYLSskCyhOK43caDThXrIXRwcRNMVGNBcjd/DSuDnQZviMVYeegFBMdncsjZy9PbjH5c1fdl5J2QhYr/mgI1+Ar7r8I4hSTW3JYNiQKXZO3N94hYPmrMv6u07Q0L5Cr33mpU53kJPir2FcdyPKZDaLSXh8fUL05KBHb5+6PEtJLL2o4VtyYivxwxex2aNwaHVxXElEvHIKIX+Ch8mx9R0Gg6JPQEbKOnPNuGPJeZ5kIHrJafaqUCTUMifi/cj6+dEes83ykn3nupbdfSPUaEtelkKv6SzAZfW8FvD1Izk68d0/oQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>';
  constructor(private langservice: TranslocoService,

    private authservice: AuthserviceService) { }

  ngOnInit() {
    //load lang which select user
    let lang = localStorage.getItem('lang');
    
    if (lang) {
      this.langservice.setActiveLang(lang);
    }
    //Check user session out or not
    let user = JSON.parse(localStorage.getItem('user')!);
    //Check token is expired
    let jwthelper = new JwtHelperService();

    setTimeout(() =>{
      if(jwthelper.isTokenExpired(user.token)){
        alert(translate('auth.guard.sessionOut'));
        this.authservice.logout('/auth/sign-in');
      }    
    },5000);

    if(!this.authservice.checktoken(user)){
      alert(translate('auth.guard.checktoken'));
      this.authservice.logout('/auth/sign-in')
    }
    else
    {
      console.log('Session is valid!');
    }




  }
}
