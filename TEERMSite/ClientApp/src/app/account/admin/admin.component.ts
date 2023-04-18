import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { AuthserviceService } from 'src/app/auth/services/authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authservice: AuthserviceService,
    private formbuilder: FormBuilder) { }

  deleteform!: FormGroup;
  updateform!: FormGroup;
  ngOnInit() {
    
    this.deleteform = this.formbuilder.group(
      {
        email: ['', Validators.required]
      });

    this.updateform = this.formbuilder.group({
      id: [''],
      fullname: [''],
      academicdegree: [''],
      academicrank: [''],
      workplace: [''],
      jobtitle: [''],
      phone: [''],
      email: ['', Validators.required],
      titlereport: [''],
      section: [''],
      participationformat: [''],
      payinfo: ['']
    });

  }
  delete(userdelete: User) {
    let useradmin : User = JSON.parse(localStorage.getItem('user')!);
    userdelete.password = '1';
    let userlist = [useradmin,userdelete];

    console.log(userdelete);

    if(userdelete.email != ''){
      this.authservice.deleteuser(userlist).subscribe(
        userlist=>{
          alert("Користувач успішно видалений");
          this.deleteform.reset();
        },
        error=>{
          alert("Помилка!");
          console.log(error);
        }
      )
    }
  }
  update(userupdate: User) {
    let useradmin: User;
    useradmin = JSON.parse(localStorage.getItem('user')!);

    useradmin.password = "1";
    userupdate.password = "1";

    let data = [useradmin, userupdate];

    this.authservice.update(data).subscribe(
      data => {
        alert('Користувач обновлений!');
        this.updateform.reset();
      },
      error => {
        alert('Помилка!' + error);
      }
    );

  }
  finduser() {
    var userdata = new User();

    let adminid = JSON.parse(localStorage.getItem('user')!);

    userdata.email = this.updateform.get('email')!.value;

    userdata.password = '1';

    userdata.id = adminid.id;

    let user = new User();
    if (userdata.email!='')
    {
      this.authservice.getuser(userdata).subscribe(
        userdata => {
          user = userdata;
          console.log(user);

          this.updateform.setValue({
            id: user.id,
            fullname: user.fullName!,
            academicdegree: user.academicDegree,
            academicrank: user.academicRank,
            workplace: user.workPlace,
            jobtitle: user.jobTitle,
            phone: user.phone,
            email: user.email,
            titlereport: user.titleReport,
            section: user.section,
            participationformat: user.participationFormat,
            payinfo: user.payInfo
          });
        },
        error => {
          alert('Користувача не знайдено');
          console.log(error);
        }
      );
    }
  }

}
