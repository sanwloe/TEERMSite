import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyinfoComponent } from './myinfo/myinfo.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { UserlistComponent } from './userlist/userlist.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from '../auth/auth.guard';


const routes : Routes = [
  { path : 'account' ,canActivate :[AuthGuard], data : { permittedRoles : ['ADMIN','USER']} , component : AccountComponent ,children : [   
    { path : 'my-info',component : MyinfoComponent },
    { path : 'admin',component : AdminComponent,canActivate : [AdminGuard], data : { permittedRoles : ['ADMIN'] } },
    { path : 'userlist',component : UserlistComponent,canActivate : [AdminGuard], data : { permittedRoles : ['ADMIN']} },
    { path : '',redirectTo : 'my-info',pathMatch : 'full'},
  ]}
]


@NgModule({
  declarations: [
    MyinfoComponent,
    AdminComponent,
    AccountComponent,
    UserlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule]
})
export class AccountModule { }
