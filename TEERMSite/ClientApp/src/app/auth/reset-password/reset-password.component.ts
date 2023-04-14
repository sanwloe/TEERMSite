import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { translate, TranslocoService } from '@ngneat/transloco';
import { User } from '../models/user';
import { UserReset } from '../models/userReset';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private formbuilder : FormBuilder,private langservice : TranslocoService,
    private authservice : AuthserviceService,private router : Router,
    private route : ActivatedRoute) 
  { 
    this.loadtranslate();

    this.jwtservice = new JwtHelperService();

    this.token = this.route.snapshot.params['token'];
  }

  jwtservice : JwtHelperService;

  resultmessage! : string;

  resetform! : FormGroup;

  resultlabel! : HTMLElement;

  token : string;
  
  ngOnInit(): void {
    try
    {
      this.jwtservice.decodeToken(this.token);
    }
    catch
    {
      this.router.navigateByUrl('/auth/sign-in');
    }

    if(this.jwtservice.isTokenExpired(this.token))
    {
      this.router.navigateByUrl('/auth/sign-in');
    }

    this.resultlabel = document.getElementById('resultlabel')!;

    this.resetform = this.formbuilder.group({
      password : ['',[Validators.minLength(8),Validators.required]],
      passwordconfirm : ['',[Validators.minLength(8),Validators.required]]
  })

  this.resetform.valueChanges.subscribe(() =>{
    if(this.resetform.invalid){
      this.resultmessage = translate('auth.rec-res.passrequirements');
      this.resultlabel.style.color = "red";
    }
    else{
      this.resultmessage = '';
    }  
  });
  }
  reset(user : User){
    if(this.resetform.get('password')!.value != this.resetform.get('passwordconfirm')!.value && (this.resetform.get('password')?.value != null && this.resetform.get('passwordconfirm')?.value!=null))
    {
      this.resultmessage = translate('auth.rec-res.resetnomatch');
      
    }
    else if(this.resetform.get('password')!.value == this.resetform.get('passwordconfirm')!.value && (this.resetform.get('password')?.value != null && this.resetform.get('passwordconfirm')?.value!=null))
    {
      this.resultmessage = '';
      
      let resetUser = new User;

      resetUser.email = this.jwtservice.decodeToken(this.token).email;

      resetUser.password = this.resetform.get('password')!.value;

      resetUser.token = this.token;

      this.authservice.resetpassword(resetUser).subscribe(
        user =>{
          alert('Nice');
          this.router.navigateByUrl('/auth/sign-in');
        },
        error =>{
          alert('((');
          this.router.navigateByUrl('auth/sign-in');
        }
      )
    }
  }
  //Загрузка перекладу 
  async loadtranslate(){
    await this.langservice.load(this.langservice.getActiveLang()).toPromise();
  }
}
