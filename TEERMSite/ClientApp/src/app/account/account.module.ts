import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyinfoComponent } from './myinfo/myinfo.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';


const routes : Routes = [
  { path : 'account' ,component : AccountComponent ,children : [   
    { path : 'my-info',component : MyinfoComponent },
    { path : 'admin',component : AdminComponent },
    { path : '',redirectTo : 'my-info',pathMatch : 'full'},
  ]}
]


@NgModule({
  declarations: [
    MyinfoComponent,
    AdminComponent,
    AccountComponent
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
