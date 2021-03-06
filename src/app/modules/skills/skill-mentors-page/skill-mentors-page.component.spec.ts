import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
import { SkillMentorsPageComponent } from './skill-mentors-page.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { MentorRecordsComponent } from '../mentor-records/mentor-records.component';
import { NoResultComponent } from '../../shared/no-result/no-result.component';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { UserService } from '../../../services/user.service';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { HttpModule } from '@angular/http';
import { HttpService as Http } from '../../../services/http.service';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';

describe('SkillMentorsPageComponent', () => {
  let component: SkillMentorsPageComponent;
  let fixture: ComponentFixture<SkillMentorsPageComponent>;
  const routeStub = new Observable((data) => { });
  const locationStub = {
    back: jasmine.createSpy('back'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      declarations: [
        SkillMentorsPageComponent,
        ExportButtonComponent,
        MentorRecordsComponent,
        NoResultComponent,
        SetRequestHeaderIconDirective,
      ],
      providers: [
        Http,
        CSVDownloadHelper,
        { provide: ActivatedRoute,
          useValue: {
            data: routeStub,
          },
        },
        { provide: Location, useValue: locationStub },
        UserService,
        TableHeaderSortHelper,
        LocationStrategy,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillMentorsPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
