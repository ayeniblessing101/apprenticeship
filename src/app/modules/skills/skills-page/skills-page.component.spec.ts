import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from '../../shared/shared.module';

import { SkillsPageComponent } from './skills-page.component';
import { SkillRecordsComponent } from '../skill-records/skill-records.component';
import { NoSearchResultComponent } from '../../request-pool/no-search-result/no-search-result.component';
import { HttpService as Http } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from '../../../services/skill.service';
import { AlertService } from '../../../services/alert.service';
import { SortingHelper } from '../../../helpers/sorting.helper';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';

describe('SkillsPageComponent', () => {
  let component: SkillsPageComponent;
  let fixture: ComponentFixture<SkillsPageComponent>;
  const routeStub = new Observable((data) => { });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillsPageComponent,
        SkillRecordsComponent,
        NoSearchResultComponent,
        SetRequestHeaderIconDirective,
      ],
      imports: [
        HttpModule,
        SharedModule,
      ],
      providers: [
        SortingHelper,
        Http,
        {provide: ActivatedRoute, useValue: {
          data: routeStub,
        }},
        SkillService,
        AlertService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsPageComponent);
    component = fixture.componentInstance;
    component.skills = [{
      id: 1,
      name: 'React',
      request_skills : [{ id : 1, primary: 'Adobe' }],
      active: true,
    }];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
