import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSearchResultComponent } from './no-search-result.component';

describe('NoSearchResultComponent', () => {
  let component: NoSearchResultComponent;
  let fixture: ComponentFixture<NoSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
