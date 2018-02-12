import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { AlertService } from 'app/services/alert.service';
import { SaveFiltersComponent } from './save-filters.component';
import { SaveFiltersModalComponent } from '../save-filters-modal/save-filters-modal.component';

describe('SaveFiltersComponent', () => {
  let component: SaveFiltersComponent;
  let fixture: ComponentFixture<SaveFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveFiltersComponent, SaveFiltersModalComponent],
      providers: [AlertService],
      imports: [FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
