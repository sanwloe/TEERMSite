import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { translate } from '@ngneat/transloco';
import { User } from '../models/user';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginform!: FormGroup;
  errormessage!: string;

  constructor(private authservice: AuthserviceService,private formbuilder : FormBuilder,
    private router : Router) { }


  ngOnInit(): void {
    //form
    this.loginform = this.formbuilder.group({
      email: ['', Validators.required],
      password : ['', Validators.required],
    });
    //error event
    this.loginform.get('fullname')?.valueChanges.subscribe(value =>{
      if(this.loginform.get('fullname')?.invalid){
        const label = document.getElementById('pibvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('pibvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    });
    this.loginform.get('academicdegree')?.valueChanges.subscribe(value =>{
      if(this.loginform.get('academicdegree')?.invalid){
        const label = document.getElementById('naukstupvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('naukstupvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    });    
  }

  login(user: User) 
  {
    if(this.loginform.valid){
      return this.authservice.signin(user).subscribe(
        user =>{
          localStorage.setItem('user',JSON.stringify(user));
          this.router.navigateByUrl('/');
        },
        error =>{
          if(error.status === 404)
            this.errormessage = translate('auth.sign-in.notfound');
          else if(error.status === 409)
            this.errormessage = translate('auth.sign-in.wrongpass');
          else{
            this.errormessage = translate('auth.sign-in.othererror');
          }
        }
      )
    }
    return;
  }


}
