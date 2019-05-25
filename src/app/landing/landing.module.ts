import { ServicesModule } from './../services/services.module';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetPasswordComponent } from './signin/reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { LandingRoutingModule } from './landing.routing';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    LandingComponent,
    MessageComponent,
    ActivateComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    HomeComponent,
  ],
  imports: [
    ServicesModule.forRoot(),
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LandingRoutingModule,
    SharedModule
  ],
  exports: [
    LandingComponent,
  ],
  entryComponents: [
    ResetPasswordComponent
  ]
})
export class LandingModule { }
