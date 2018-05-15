import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { SearchPageComponent } from './search-page.component';
import { SearchService } from '../../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NoResultComponent } from '../../shared/no-result/no-result.component';
import { AuthService } from '../../../services/auth.service';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  const routeStub = new Observable((event) => { });
  const mockRouter = {
    navigate: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPageComponent, NoResultComponent],
      providers: [
        SearchService,
        { provide: ActivatedRoute, useValue: { queryParams: routeStub } },
        { provide: Router, useValue: mockRouter },
        AuthService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
