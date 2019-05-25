import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/shared.module';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NouisliderModule } from 'ng2-nouislider';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CategoryResover } from './category-resover';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';
import { AddNewsComponent } from './news-editor/add-news/add-news.component';
import { NewsComponent } from './news-editor/news.component';
import { AddComponent } from './plan/add/add.component';
import { PaginatorComponent } from './plan/paginator/paginator.component';
import { PlanComponent } from './plan/plan.component';
import { CropModalComponent } from './profile/crop-modal/crop-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        AngularEditorModule,
        HomeRoutingModule,
        NgbModule,
        ImageCropperModule,
        SharedModule,
        RouterModule
    ],
    entryComponents: [
        CropModalComponent,
    ],
    declarations: [
        HomeComponent,
        PlanComponent,
        UsersComponent,
        AddComponent,
        NewsComponent,
        AddNewsComponent,
        SafeHtmlPipe,
        ProfileComponent,
        CropModalComponent,
        PaginatorComponent
    ],
    exports: [
        HomeComponent
    ],
    providers: [
        CategoryResover,
    ],
})
export class HomeModule { }
