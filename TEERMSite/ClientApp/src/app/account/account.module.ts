import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyinfoComponent } from './myinfo/myinfo.component';
import { PayinfoComponent } from './payinfo/payinfo.component';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';


const routes : Routes = [
  { path : 'account' ,component : AccountComponent ,children : [   
    { path : 'my-info',component : MyinfoComponent },
    { path : 'pay-info',component : PayinfoComponent },
    { path : '',redirectTo : 'my-info',pathMatch : 'full'},
  ]}
]


@NgModule({
  declarations: [
    MyinfoComponent,
    PayinfoComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports : [RouterModule]
})
export class AccountModule { }
