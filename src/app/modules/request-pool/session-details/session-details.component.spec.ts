import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { SessionDetailsComponent } from './session-details.component';
import { UserService } from '../../../services/user.service';
import { RequestService } from '../../../services/request.service';
import { HttpService as Http } from '../../../services/http.service';
import { RequestServiceStub } from '../../../stubs/request-stub.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterService } from '../../../services/filter.service';
import { SharedModule } from '../../shared/shared.module';
import { UserServiceStub } from '../../../stubs/user-stub.service';
import { FileService } from '../../../services/files.service';
import { AddFileModalComponent } from '../add-file-modal/add-file-modal.component';
import { FormsModule } from '@angular/forms';

describe('SessionDetailsComponent', () => {
  let component: SessionDetailsComponent;
  let fixture: ComponentFixture<SessionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        InfiniteScrollModule,
        SharedModule,
        HttpModule,
        FormsModule,
      ],
      declarations: [
        SessionDetailsComponent,
        AddFileModalComponent,
      ],
      providers: [
        Http,
        { provide: RequestService, useClass: RequestServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        RequestService,
        FilterService,
        FileService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDetailsComponent);
    component = fixture.componentInstance;
    component.session = {
      files: [],
    };
    component.request = {
      mentee_id: 1,
      mentor_id: 2,
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
