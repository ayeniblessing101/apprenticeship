import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from '../../modules/shared/alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { ConfirmationAlertComponent } from './confimation-alert/confirmation-alert.component';
import { MessageAlertComponent } from './message-alert/message-alert.component'


import {
  MdCardModule,
  MdCheckboxModule,
  MdSelectModule,
  MdRadioModule,
  MdSliderModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MdCardModule,
  ],
  declarations: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    AlertComponent,
    ConfirmationAlertComponent,
    NotificationsComponent,
    MessageAlertComponent,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    AlertComponent,
    ConfirmationAlertComponent,
    MessageAlertComponent,
  ],
  providers: [
    AlertService,
    NotificationsComponent,
  ],
})
export class SharedModule { }
