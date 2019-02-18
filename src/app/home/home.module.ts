import { UsersComponent } from './users/users.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { ComponentsModule } from '../components/components.module';
import { PlanComponent } from './plan/plan.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddComponent } from './plan/add/add.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        ComponentsModule,
        ReactiveFormsModule,
        FileUploadModule,
        BrowserAnimationsModule,
        PdfViewerModule
    ],
    declarations: [ HomeComponent, PlanComponent, UsersComponent, AddComponent ],
    exports: [ HomeComponent ],
    providers: []
})
export class HomeModule { }
