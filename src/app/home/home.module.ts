import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { HomeRoutingModule } from './home.routing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsEditorComponent } from './news-editor/news-editor.component';
import { NouisliderModule } from 'ng2-nouislider';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';

import { PlanComponent } from './plan/plan.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AddComponent } from './plan/add/add.component';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AddNewsComponent } from './news-editor/add-news/add-news.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { CategoryResover } from './category-resover';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        PdfViewerModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AngularEditorModule,
        HomeRoutingModule,
        RouterModule
    ],
    declarations: [
        HomeComponent,
        PlanComponent,
        UsersComponent,
        AddComponent,
        NewsEditorComponent,
        AddNewsComponent,
        SafeHtmlPipe
    ],
    exports: [
        HomeComponent
    ],
    providers: [CategoryResover],
    bootstrap: [HomeComponent]
})
export class HomeModule { }
