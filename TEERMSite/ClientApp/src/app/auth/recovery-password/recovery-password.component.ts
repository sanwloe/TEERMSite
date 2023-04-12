import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { translate } from '@ngneat/transloco';
import { User } from '../models/user';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {

  constructor(private authservice : AuthserviceService , private formbuilder : FormBuilder) { }

  recoveryform! : FormGroup;

  resultmessage! : string;

  ngOnInit(){
    this.recoveryform = this.formbuilder.group({
      email : ['',Validators.email]
    });
  }

  sendrecoverylinkpassword(user : User){
    user.password = '1';
    let labelresult = document.getElementById('labelresult');
    this.authservice.sendrecoverylink(user).subscribe(
      user =>{
        labelresult!.style.color = "green";
        this.resultmessage = translate('auth.rec-res.recoveryresult200');

      },
      error=>{
        if(error.status === 400){
          labelresult!.style.color = 'red';
          this.resultmessage = translate('auth.rec-res.recoveryresult400');
        }
      }
    );
  }



}
