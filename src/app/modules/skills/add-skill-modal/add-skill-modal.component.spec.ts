import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSkillModalComponent } from './add-skill-modal.component';
import { SkillService } from './../../../services/skill.service';
import { AlertService } from '../../../services/alert.service';

describe('AddSkillModalComponent', () => {
  let component: AddSkillModalComponent;
  let fixture: ComponentFixture<AddSkillModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddSkillModalComponent],
      providers: [AlertService, SkillService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
