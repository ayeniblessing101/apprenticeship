import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillTopMentorsComponent } from './skill-top-mentors.component';
import { NoSearchResultComponent } from '../../request-pool/no-search-result/no-search-result.component';
import { SkillService } from '../../../services/skill.service';
import { Observable } from 'rxjs/Observable';

describe('SkillTopMentorsComponent', () => {
  let component: SkillTopMentorsComponent;
  let fixture: ComponentFixture<SkillTopMentorsComponent>;
  const skillService = {
    getSkillTopMentors: () => Observable.of({}),
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        SkillTopMentorsComponent,
        NoSearchResultComponent,
      ],
      providers: [
        { provide: SkillService, useValue: skillService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTopMentorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component SkillRequests', () => {
    expect(component).toBeTruthy();
  });
});
