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
    let jwthelper = new JwtHelperService();
    if (jwthelper.isTokenExpired(user.token)) {
      this.authservice.logout('/auth/sign-in');
    }
  }
}
