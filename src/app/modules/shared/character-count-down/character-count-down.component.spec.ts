import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCountDownComponent } from './character-count-down.component';

describe('CharacterCountDownComponent', () => {
  let component: CharacterCountDownComponent;
  let fixture: ComponentFixture<CharacterCountDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterCountDownComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCountDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
