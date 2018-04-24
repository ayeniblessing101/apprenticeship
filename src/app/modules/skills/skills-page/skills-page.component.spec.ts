import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, XHRBackend, BrowserXhr, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SharedModule } from '../../shared/shared.module';
import { SkillsPageComponent } from './skills-page.component';
import { SkillRecordsComponent } from '../skill-records/skill-records.component';
import { AddSkillModalComponent } from './../add-skill-modal/add-skill-modal.component';
import { EditSkillModalComponent } from '../edit-skill-modal/edit-skill-modal.component';
import { HttpService as Http } from '../../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from '../../../services/skill.service';
import { AlertService } from '../../../services/alert.service';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { SearchService } from '../../../services/search.service';


describe('SkillsPageComponent', () => {
  let component: SkillsPageComponent;
  let fixture: ComponentFixture<SkillsPageComponent>;
  const routeStub = new Observable((data) => { });
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SkillsPageComponent,
        SkillRecordsComponent,
        EditSkillModalComponent,
        SetRequestHeaderIconDirective,
        AddSkillModalComponent,
      ],
      imports: [
        HttpModule,
        SharedModule,
        FormsModule,
      ],
      providers: [
        TableHeaderSortHelper,
        Http,
        {
          provide: ActivatedRoute, useValue: {
            data: routeStub,
          },
        },
        { provide: Router, useValue: mockRouter },
        SkillService,
        AlertService,
        SearchService,
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
      request_skills: [{ id: 1, primary: 'Adobe' }],
      active: true,
    }];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
