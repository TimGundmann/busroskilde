import { CategoryResover } from './category-resover';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { PlanComponent } from './plan/plan.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'news', component: NewsEditorComponent },
      { path: 'users', component: UsersComponent },
      {
        path: 'plans/:category',
        component: PlanComponent,
        resolve: {
          category: CategoryResover
        }
      },
      { path: 'profile', component: ProfileComponent}
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
  ],
})
export class HomeRoutingModule { }
