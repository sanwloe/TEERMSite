import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { DataService } from '../DataService';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor (private authservice : AuthserviceService,private langservice : TranslocoService,private http : HttpClient)  {}

  isExpanded = true;

  isLogin = false;
  
  showMenu = false;

  public reglink : string = "";

  rightmenu = document.getElementById('droprightmenu');

  toggle() {
    if(this.isExpanded == true)
    {
      let navmenu = document.getElementById('navmenu');
      navmenu!.style.display = 'none';
      this.isExpanded = false;
    }
    else if(this.isExpanded == false)
    {
      let navmenu = document.getElementById('navmenu');
      navmenu!.style.display = 'block';
      this.isExpanded = true;
    }
  }

  ngOnInit(): void {

    // let lang = localStorage.getItem('lang');
    // if(!lang) {
    //   this.reglink = "https://docs.google.com/forms/d/1EJLUmctkUfGaQhLF304WP6_x2cqIY1JJqFLPZmep5bU/edit";
    // }
    this.langservice.langChanges$.subscribe(() =>{
        let lang = localStorage.getItem('lang');
        if(this.langservice.getActiveLang() == 'English')
        {
          this.reglink = "https://docs.google.com/forms/d/1mC9cxI-7HdxLrhFFtCW4Y5rp3gWmn-rfU4cfNsglxnI/edit";
        }
        else if(this.langservice.getActiveLang() == 'Ukrainian'){
          this.reglink = "https://docs.google.com/forms/d/1EJLUmctkUfGaQhLF304WP6_x2cqIY1JJqFLPZmep5bU/edit";
        }
        else{
          this.reglink = 'https://docs.google.com/forms/d/1mC9cxI-7HdxLrhFFtCW4Y5rp3gWmn-rfU4cfNsglxnI/edit';
        }
    });

    let user = JSON.parse(localStorage.getItem('user')!);

    if(user !=null)
    {
      this.isLogin = true;
    }
    else
    {
      this.isLogin = false;
    }
  }
  logout(){
    this.authservice.logout('/auth/sign-in');
  }
  uploadResultOfConference()
  {
    const fileName = 'TEERM2023.pdf'; // Встановіть ім'я вашого файлу
    const url = '../ClientApp/src/assets/TEERM2023.pdf'; // Встановіть URL вашого файлу

    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });

    this.http.get(url, { headers: headers, responseType: 'blob' }).subscribe((response: any) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }




  




}
