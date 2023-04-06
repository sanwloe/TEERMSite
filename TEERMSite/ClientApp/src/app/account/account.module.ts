import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { Route, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';


const routes : Routes = [
    { path : 'myaccount',component : MyaccountComponent ,canActivate : [AuthGuard],data : { permittedRoles : ['ADMIN','USER'] }}
]



@NgModule({
  declarations: [
    MyaccountComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
