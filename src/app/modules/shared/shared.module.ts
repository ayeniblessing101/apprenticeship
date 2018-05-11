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
import { CancelRequestModalComponent } from '../request-pool/cancel-request-modal/cancel-request-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

import { DropDownComponent } from './drop-down/drop-down.component';
import { NoResultComponent } from './no-result/no-result.component';
import { SkillsDropdownComponent } from './skills-dropdown/skills-dropdown.component';
import { CalendarPickerComponent } from './calendar/calendar-picker.component';
import { ExportButtonComponent } from './export-button/export-button.component';
import { RequestSkillPipe } from '../../pipes/request-skills-pipe';
import { ProposedRequestDurationPipe } from '../../pipes/proposed-request-duration.pipe';
import { CharacterCountDownComponent } from './character-count-down/character-count-down.component';
import { RequestDurationPipe } from '../../pipes/request-duration.pipe';
import { UserRolePipe } from '../../pipes/user-role.pipes';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from '../../services/toast.service';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2AutoCompleteModule,
    StarRatingModule.forRoot(),
  ],
  declarations: [
    CharacterCountDownComponent,
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
    UserRolePipe,
    RequestDurationPipe,
    ProposedRequestDurationPipe,
    NoResultComponent,
    ToastComponent,
    DateRangePickerComponent,
    CancelRequestModalComponent,
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
    ToastComponent,
    ProposedRequestDurationPipe,
    RequestSkillPipe,
    UserRolePipe,
    RequestDurationPipe,
    StarRatingModule,
    NoResultComponent,
    DateRangePickerComponent,
    CancelRequestModalComponent,
  ],
  providers: [
    NotificationsComponent,
    SkillService,
    ToastService,
  ],
})
export class SharedModule { }
