import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRequestComponent } from './create-request/create-request.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { SkillService } from '../../services/skill.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { ConfirmationAlertComponent } from './confimation-alert/confirmation-alert.component';
import { MessageAlertComponent } from './message-alert/message-alert.component'

import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { MdCardModule } from '@angular/material';
import { DropDownComponent } from './drop-down/drop-down.component';
import { SkillsDropdownComponent } from './skills-dropdown/skills-dropdown.component';
import { CalendarPickerComponent } from './calendar/calendar-picker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdCardModule,
    FormsModule,
    Ng2AutoCompleteModule,
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
    CreateRequestComponent,
    DropDownComponent,
    SkillsDropdownComponent,
    CalendarPickerComponent,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    AlertComponent,
    ConfirmationAlertComponent,
    MessageAlertComponent,
    DropDownComponent,
    CalendarPickerComponent,
  ],
  providers: [
    AlertService,
    NotificationsComponent,
    SkillService,
  ],
})
export class SharedModule { }
