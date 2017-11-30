import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, XHRBackend } from '@angular/http';

import { HeaderComponent } from './header.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AuthService } from '../../../services/auth.service';
import { RouterLinkStubDirective } from '../../../stubs/router-stubs';
import { UserService } from '../../../services/user.service';
import { HttpService as Http } from '../../../services/http.service';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [HeaderComponent, NotificationsComponent, RouterLinkStubDirective],
      imports: [BrowserAnimationsModule, HttpModule],
      providers: [
        Http,
        { provide: AuthService, useValue: {
          userInfo : {
            roles: {
              LENKEN_ADMIN: 'ewrbgve',
            },
          },
        },
        },
        UserService,
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
