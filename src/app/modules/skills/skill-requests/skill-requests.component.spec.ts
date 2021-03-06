import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillRequestsComponent } from './skill-requests.component';
import { ExportButtonComponent } from '../../shared/export-button/export-button.component';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { NoResultComponent } from '../../shared/no-result/no-result.component';
import { RequestDurationPipe } from '../../../pipes/request-duration.pipe';
import { RequestStatusPipe } from '../../../pipes/requests-status.pipe';
import { SkillService } from '../../../services/skill.service';
import { Observable } from 'rxjs/Observable';
import { CSVDownloadHelper } from '../../../helpers/csv-download.helper';

describe('SkillRequestsComponent', () => {
  let component: SkillRequestsComponent;
  let fixture: ComponentFixture<SkillRequestsComponent>;
  let requestDuration: RequestDurationPipe;
  let requestStatus: RequestStatusPipe;
  const skillService = {
    getSkillRequests : () => Observable.of({}),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        SkillRequestsComponent,
        ExportButtonComponent,
        SetRequestHeaderIconDirective,
        RequestDurationPipe,
        RequestStatusPipe,
        NoResultComponent,
      ],
      providers: [
        TableHeaderSortHelper,
        CSVDownloadHelper,
        { provide: SkillService, useValue: skillService },
      ],
    })
      .compileComponents();
    requestDuration = new RequestDurationPipe;
    requestStatus = new RequestStatusPipe;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component SkillRequests', () => {
    expect(component).toBeTruthy();
  });
});
