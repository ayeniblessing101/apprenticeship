import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDropdownComponent } from './skills-dropdown.component';

describe('SkillsDropdownComponent', () => {
  let component: SkillsDropdownComponent;
  let fixture: ComponentFixture<SkillsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
