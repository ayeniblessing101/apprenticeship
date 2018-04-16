import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from '../../shared/shared.module';
import { SkillDetailsPageComponent } from './skill-details-page.component';
import { SkillRequestsComponent } from '../skill-requests/skill-requests.component';
import { SkillTopMentorsComponent } from '../skill-top-mentors/skill-top-mentors.component';
import { NoSearchResultComponent } from '../../request-pool/no-search-result/no-search-result.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { RequestStatusPipe } from '../../../pipes/requests-status.pipe';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { SkillService } from '../../../services/skill.service';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';

describe('SkillDetailsPageComponent', () => {
  let component: SkillDetailsPageComponent;
  let fixture: ComponentFixture<SkillDetailsPageComponent>;
  const skillService = {
    getSkillRequests : () => Observable.of({}),
    getSkillTopMentors: () => Observable.of({}),
  };

  const routerStub = {
    navigate: jasmine.createSpy('admin/skills/3/mentors'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillDetailsPageComponent,
        SkillRequestsComponent,
        SkillTopMentorsComponent,
        NoSearchResultComponent,
        RequestStatusPipe,
        SetRequestHeaderIconDirective,
      ],
      imports: [
        SharedModule,
        FormsModule,
      ],
      providers: [
        TableHeaderSortHelper,
        CSVDownloadHelper,
        { provide: SkillService, useValue: skillService },
        { provide: ActivatedRoute, useValue: {
          paramMap: Observable.of(convertToParamMap({
            id: 1 })),
        },
        },
        { provide: Router, useValue: routerStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
