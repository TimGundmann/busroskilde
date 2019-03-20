import { HomeComponent } from './home/home.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ActivateComponent } from './activate/activate.component';
import { LandingComponent } from './landing.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '', component: LandingComponent,
    children: [
      { path: 'landing', component: HomeComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'activate/:token', component: ActivateComponent },
      { path: 'password/:token', component: NewPasswordComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
})
export class LandingRoutingModule { }
