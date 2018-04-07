import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
import { SkillMentorsPageComponent } from './skill-mentors-page.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { MentorRecordsComponent } from '../mentor-records/mentor-records.component';
import { NoSearchResultComponent } from '../../request-pool/no-search-result/no-search-result.component';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { UserService } from '../../../services/user.service';
import { SortingHelper } from '../../../helpers/sorting.helper';
import { HttpModule } from '@angular/http';
import { HttpService as Http } from '../../../services/http.service';

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
        NoSearchResultComponent,
        SetRequestHeaderIconDirective,
      ],
      providers: [
        Http,
        { provide: ActivatedRoute,
          useValue: {
            data: routeStub,
          },
        },
        { provide: Location, useValue: locationStub },
        UserService,
        SortingHelper,
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
