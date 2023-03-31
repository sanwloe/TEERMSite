import { Component } from '@angular/core';
import { DataService } from '../DataService';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor (private dataservice : DataService) {}

  isExpanded = true;

  rightmenu = document.getElementById('droprightmenu');

  toggle() {
    this.isExpanded = !this.isExpanded;
    // this.dataservice.nav_expand = !this.isExpanded;
  }

  showMenu = false;




}
