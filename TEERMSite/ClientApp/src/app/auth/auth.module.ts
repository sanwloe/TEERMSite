import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoRootModule } from '../transloco-root.module';
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';

const routes : Routes = [
    {
        path : 'auth',component : AuthComponent,
        children : [
            { path : 'sign-up',component : RegistrationComponent ,pathMatch : 'full'},
            { path : '',redirectTo : 'sign-up', pathMatch: 'full'}
        ]
    }
]


@NgModule({
  declarations: [
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoRootModule,
  ],
  exports : [RouterModule],
  providers: [],
})
export class AuthModule { }