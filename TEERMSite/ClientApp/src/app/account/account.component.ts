import { Component, OnInit } from '@angular/core';
import { User } from '../auth/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user! : User;

  ngOnInit(): void {
    
  }

  isAdmin() {
    this.user  = JSON.parse(localStorage.getItem('user')!);

    if(this.user.role.name=="ADMIN"){
      return true;
    }
    else{
      return false;
    }
  }

}
