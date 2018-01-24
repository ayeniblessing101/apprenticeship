import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

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


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        NotificationsComponent,
        CreateRequestComponent,
        RouterLinkStubDirective,
        DropDownComponent,
        SkillsDropdownComponent,
      ],
      imports: [BrowserAnimationsModule, HttpModule, FormsModule, Ng2AutoCompleteModule, RouterTestingModule],
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
      ],
    })
      .compileComponents();
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
