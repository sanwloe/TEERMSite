import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';
import { DataService } from '../DataService';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor (private authservice : AuthserviceService)  {}

  isExpanded = true;

  isLogin = false;
  
  showMenu = false;

  rightmenu = document.getElementById('droprightmenu');

  toggle() {
    this.isExpanded = !this.isExpanded;
    // this.dataservice.nav_expand = !this.isExpanded;
  }

  ngOnInit(): void {

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




  




}
