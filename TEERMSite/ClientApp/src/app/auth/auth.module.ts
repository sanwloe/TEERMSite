import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoRootModule } from '../transloco-root.module';
import { AuthComponent } from './auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { RecoveryPasswordComponent } from './recovery-password/recovery-password.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes : Routes = [
    {
        path : 'auth',component : AuthComponent,
        children : [
            { path : 'sign-up',component : RegistrationComponent ,pathMatch : 'full' },
            { path : '',redirectTo : 'sign-up', pathMatch: 'full' },
            { path : 'sign-in',component : SignInComponent },
            { path : 'recovery-password',component : RecoveryPasswordComponent },
            { path : 'reset-password',component : ResetPasswordComponent }
        ]
    }
]


@NgModule({
  declarations: [
    RegistrationComponent,
    AuthComponent,
    SignInComponent,
    RecoveryPasswordComponent,
    ResetPasswordComponent,
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