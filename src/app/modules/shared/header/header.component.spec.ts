import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { AuthService } from '../../../services/auth.service';
import { RouterLinkStubDirective } from '../../../stubs/router-stubs';
import { UserService } from '../../../services/user.service';
import { HttpService as Http } from '../../../services/http.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { NotificationService } from 'app/services/notifications.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import { UserServiceStub } from 'app/stubs/user-stub.service';
import { NotificationServiceStub } from 'app/stubs/notification-stub.service';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { SkillsDropdownComponent } from '../skills-dropdown/skills-dropdown.component';
import { RequestDetailsModalComponent } from '../../request-pool/request-details-modal/request-details-modal.component';
import { AlertService } from '../../../services/alert.service';
import { ProposedRequestDurationPipe } from '../../../pipes/proposed-request-duration.pipe';
import { RequestSkillPipe } from '../../../pipes/request-skills-pipe';
import { StarRatingModule } from 'angular-star-rating';
import { CharacterCountDownComponent } from '../character-count-down/character-count-down.component';
import { CancelRequestModalComponent } from '../../request-pool/cancel-request-modal/cancel-request-modal.component';
import { SearchBoxComponent } from '../search-box/search-box.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let proposedRequestDuration: ProposedRequestDurationPipe;
  let requestSkill: RequestSkillPipe;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        NotificationsComponent,
        CreateRequestComponent,
        RouterLinkStubDirective,
        DropDownComponent,
        SkillsDropdownComponent,
        RequestDetailsModalComponent,
        ProposedRequestDurationPipe,
        RequestSkillPipe,
        CharacterCountDownComponent,
        CancelRequestModalComponent,
        SearchBoxComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        HttpModule, FormsModule,
        ReactiveFormsModule,
        Ng2AutoCompleteModule,
        RouterTestingModule,
        StarRatingModule,
      ],
      providers: [
        Http,
        {
          provide: AuthService, useValue: {
            userInfo: {
              roles: {
                LENKEN_ADMIN: 'ewrbgve',
              },
            },
          },
        },
        { provide: UserService, useClass: UserServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        AlertService,
      ],
    })
      .compileComponents();
    proposedRequestDuration = new ProposedRequestDurationPipe;
    requestSkill = new RequestSkillPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
