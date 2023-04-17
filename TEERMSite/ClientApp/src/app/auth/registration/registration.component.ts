import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regform!: FormGroup;
  passworderror!: string;
  errormessage!: string;


  constructor(private authservice: AuthserviceService,private formbuilder : FormBuilder,
    private router : Router) { }


  ngOnInit(): void {
    //form
    this.regform = this.formbuilder.group({
      fullname: ['', Validators.required],
      academicdegree: ['', Validators.required],
      academicrank: ['', Validators.required],
      workplace: ['', Validators.required],
      jobtitle: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      titlereport: ['', Validators.required],
      section: ['', Validators.required],
      participationformat: ['', Validators.required],
      payinfo : ['',Validators.required]
    });
    //error event
    this.regform.get('fullname')?.valueChanges.subscribe(value =>{
      if(this.regform.get('fullname')?.invalid){
        const label = document.getElementById('pibvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('pibvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    });
    this.regform.get('academicdegree')?.valueChanges.subscribe(value =>{
      if(this.regform.get('academicdegree')?.invalid){
        const label = document.getElementById('naukstupvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('naukstupvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    });
    this.regform.get('academicrank')?.valueChanges.subscribe(value =>{
      if(this.regform.get('academicrank')?.invalid){
        const label = document.getElementById('vchenzvanvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('vchenzvanvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('workplace')?.valueChanges.subscribe(value =>{
      if(this.regform.get('workplace')?.invalid){
        const label = document.getElementById('workplacevalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('workplacevalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('jobtitle')?.valueChanges.subscribe(value =>{
      if(this.regform.get('jobtitle')?.invalid){
        const label = document.getElementById('posadavalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('posadavalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('phone')?.valueChanges.subscribe(value =>{
      if(this.regform.get('phone')?.invalid){
        const label = document.getElementById('phonenumber');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('phonenumber');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('email')?.valueChanges.subscribe(value =>{
      if(this.regform.get('email')?.invalid){
        const label = document.getElementById('emailvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('emailvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('password')?.valueChanges.subscribe(value =>{
      if(this.regform.get('password')?.invalid){
        const label = document.getElementById('passwordvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('passwordvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('titlereport')?.valueChanges.subscribe(value =>{
      if(this.regform.get('titlereport')?.invalid){
        const label = document.getElementById('dopvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('dopvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('participationformat')?.valueChanges.subscribe(value =>{
      if(this.regform.get('participationformat')?.invalid){
        const label = document.getElementById('formatvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('formatvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    this.regform.get('section')?.valueChanges.subscribe(value =>{
      if(this.regform.get('section')?.invalid){
        const label = document.getElementById('sectionvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('sectionvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    });
    this.regform.get('payinfo')?.valueChanges.subscribe(value =>{
      if(this.regform.get('payinfo')?.invalid){
        const label = document.getElementById('payvalid');
        label?.classList.replace('is-valid','is-invalid');
      }
      else
      {
        const label = document.getElementById('payvalid');
        label?.classList.replace('is-invalid','is-valid');
      }
    }); 
    
  }

  register(user: User) 
  {
    if(user!=null && this.regform.valid){
      user.roleId = 2;
      return this.authservice.signup(user).subscribe(
        user =>{
          localStorage.setItem('user',JSON.stringify(user));
          this.router.navigateByUrl('/');
        },
        error =>{
          console.log(error);
          if(error.status === 409)
            this.errormessage = "This user already exists!";
          else
            this.errormessage = "Something went wrong.Try again!";
        }
      )
    }
    return;
  }
}
