import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { translate, TranslocoService } from '@ngneat/transloco';
import { User } from './auth/models/user';
import { AuthserviceService } from './auth/services/authservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  user!: User;
  constructor(private langservice: TranslocoService,

    private authservice: AuthserviceService) 
    {

    }

  ngOnInit() {
    //load lang which select user
    let lang = localStorage.getItem('lang');

    if (lang) {
      this.langservice.setActiveLang(lang);
    }
    this.loadtranslate();
    
    //Check user session out or not
    // this.user = JSON.parse(localStorage.getItem('user')!);
    // //Check token is expired
    // let jwthelper = new JwtHelperService();
    // if (this.user != null)
    //   this.authservice.checktoken(this.user).subscribe(
    //     user => {
    //       console.log('Session is valid!');
    //       if (jwthelper.isTokenExpired(this.user.token)) {
    //         alert(translate('auth.guard.sessionOut'));
    //         this.authservice.logout('/auth/sign-in');
    //       }
    //     },
    //     error => {
    //       alert(translate('auth.guard.checktoken'));
    //       this.authservice.logout('/auth/sign-in')
    //     }
    //   )
  }
  async loadtranslate(){
    await this.langservice.load(this.langservice.getActiveLang()).toPromise();
  }
}
