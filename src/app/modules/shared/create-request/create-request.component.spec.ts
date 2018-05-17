import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { CreateRequestComponent } from './create-request.component';
import { AlertService } from '../../../services/alert.service';
import { RequestService } from 'app/services/request.service';
import { UserService } from 'app/services/user.service';
import { HttpService as Http } from '../../../services/http.service';
import { SkillService } from '../../../services/skill.service';
import { NotificationService } from '../../../services/notifications.service';
import { DropDownComponent } from 'app/modules/shared/drop-down/drop-down.component';
import { SkillsDropdownComponent } from '../skills-dropdown/skills-dropdown.component';
import { SkillServiceStub } from '../../../stubs/skill-stub.service';
import { NotificationServiceStub } from '../../../stubs/notification-stub.service';
import { CharacterCountDownComponent } from 'app/modules/shared/character-count-down/character-count-down.component';

describe('CreateRequestComponent', () => {
  let component: CreateRequestComponent;
  let fixture: ComponentFixture<CreateRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        FormsModule,
        Ng2AutoCompleteModule,
        ReactiveFormsModule,
      ],
      declarations: [
        CreateRequestComponent,
        DropDownComponent,
        SkillsDropdownComponent,
        CharacterCountDownComponent,
      ],
      providers: [
        Http,
        UserService,
        AlertService,
        { provide: SkillService, useClass: SkillServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        RequestService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
