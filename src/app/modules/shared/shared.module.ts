import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateRequestComponent } from './create-request/create-request.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { AlertComponent } from './alert/alert.component';
import { SkillService } from '../../services/skill.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { ConfirmationAlertComponent } from './confimation-alert/confirmation-alert.component';
import { MessageAlertComponent } from './message-alert/message-alert.component'

import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { DropDownComponent } from './drop-down/drop-down.component';
import { SkillsDropdownComponent } from './skills-dropdown/skills-dropdown.component';
import { CalendarPickerComponent } from './calendar/calendar-picker.component';
import { ExportButtonComponent } from './export-button/export-button.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Ng2AutoCompleteModule,
  ],
  declarations: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    UnauthorizedPageComponent,
    AlertComponent,
    ConfirmationAlertComponent,
    NotificationsComponent,
    MessageAlertComponent,
    CreateRequestComponent,
    DropDownComponent,
    SkillsDropdownComponent,
    CalendarPickerComponent,
    ExportButtonComponent,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    UnauthorizedPageComponent,
    AlertComponent,
    ConfirmationAlertComponent,
    MessageAlertComponent,
    DropDownComponent,
    CalendarPickerComponent,
    ExportButtonComponent,
  ],
  providers: [
    NotificationsComponent,
    SkillService,
  ],
})
export class SharedModule { }
