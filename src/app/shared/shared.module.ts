import { ConfirmComponent } from './confirm/confirm.component';
import { HttpClientModule } from '@angular/common/http';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from './notification/notification.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SvgComponent } from 'app/shared/svg/svg.component';
import { ConfigurationComponent } from './../home/configuration/configuration.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDefsComponent } from './svg-defs/svg-defs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    ConfigurationComponent,
    SvgComponent,
    SvgDefsComponent,
    NavbarComponent,
    ConfirmComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    RouterModule.forChild([]),
    HttpClientModule
  ],
  entryComponents: [
    ConfirmComponent
  ],
  exports: [
    FooterComponent,
    ConfigurationComponent,
    SvgComponent,
    SvgDefsComponent,
    NavbarComponent,
    ConfirmComponent,
    NotificationComponent,
  ]
})
export class SharedModule { }
