import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoRootModule } from '../transloco-root.module';
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes : Routes = [
    {
        path : 'auth',component : AuthComponent,
        children : [
            { path : 'sign-up',component : RegistrationComponent ,pathMatch : 'full' },
            { path : '',redirectTo : 'sign-up', pathMatch: 'full' },
            { path : 'sign-in',component : SignInComponent },
            { path : 'recovery-password',component : RecoveryPasswordComponent }
        ]
    }
]


@NgModule({
  declarations: [
    RegistrationComponent,
    AuthComponent,
    SignInComponent,
    RecoveryPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoRootModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports : [RouterModule],
  providers: [],
})
export class AuthModule { }