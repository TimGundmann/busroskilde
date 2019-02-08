import { ActivateComponent } from './landing/activate/activate.component';
import { AuthGuard } from './auth.guard';
import { LandingModule } from './landing/landing.module';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { SigninComponent } from './landing/signin/signin.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'activate/:token', component: ActivateComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    LandingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
