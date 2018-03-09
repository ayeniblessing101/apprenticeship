import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
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
import { RequestDetailsModalComponent } from '../request-pool/request-details-modal/request-details-modal.component';

import { FormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { DropDownComponent } from './drop-down/drop-down.component';
import { SkillsDropdownComponent } from './skills-dropdown/skills-dropdown.component';
import { CalendarPickerComponent } from './calendar/calendar-picker.component';
import { ExportButtonComponent } from './export-button/export-button.component';
import { RequestSkillPipe } from '../../pipes/request-skills-pipe';
import { ProposedRequestDurationPipe } from '../../pipes/proposed-request-duration.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    Ng2AutoCompleteModule,
    StarRatingModule.forRoot(),
  ],
  declarations: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    RequestDetailsModalComponent,
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
    RequestSkillPipe,
    ProposedRequestDurationPipe,
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
    RequestDetailsModalComponent,
    CalendarPickerComponent,
    ExportButtonComponent,
    ProposedRequestDurationPipe,
    RequestSkillPipe,
    StarRatingModule,
  ],
  providers: [
    NotificationsComponent,
    SkillService,
  ],
})
export class SharedModule { }
