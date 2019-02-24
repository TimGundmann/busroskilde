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

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    LandingComponent,
    MessageComponent,
    ActivateComponent
  ],
  imports: [
    ServicesModule.forRoot(),
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }
