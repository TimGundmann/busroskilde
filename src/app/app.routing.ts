import { AuthGuard } from './home/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', loadChildren: './landing/landing.module#LandingModule'},
  { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 90]
    })
  ]
})
export class AppRoutingModule { }
