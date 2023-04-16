import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setValue } from '@ngneat/transloco';
import { User } from 'src/app/auth/models/user';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.css']
})
export class MyinfoComponent implements OnInit {


  constructor(private authservice: AuthserviceService, private formbuilder: FormBuilder) { }

  updateform!: FormGroup;
  user!: User;

  update(user: User) {
    user.email = this.user.email;
    user.token = this.user.token;
    user.password = "1";
    this.authservice.userupdateinfo(user).subscribe(
      user => {
        localStorage.setItem('user', JSON.stringify(user));
      },
      error => {
        console.log(error);
      }

    );
  }

  ngOnInit(): void {
    //Get user info
    this.user = JSON.parse(localStorage.getItem('user')!);
    if(this.user==null){
      this.authservice.logout('auth/sign-in');
    }

    if (this.user.fullName != null) {
      this.updateform = this.formbuilder.group({
        fullname: [this.user.fullName, Validators.required],
        academicdegree: [this.user.academicDegree, Validators.required],
        academicrank: [this.user.academicRank, Validators.required],
        workplace: [this.user.workPlace, Validators.required],
        jobtitle: [this.user.jobTitle, Validators.required],
        titlereport: [this.user.titleReport, Validators.required],
        section: [this.user.section, Validators.required]
      });

    }

  }


}
