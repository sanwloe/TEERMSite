import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor(private authservice : AuthserviceService) { }

  users!: Observable<User[]>;

  
  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.users = this.authservice.getusers(user);
  }

}
