import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MentorRecordsComponent } from './mentor-records.component';
import { SetRequestHeaderIconDirective } from '../../../directives/set-request-header-icon.directive';
import { TableHeaderSortHelper } from '../../../helpers/table-header-sort.helper';
import { SharedModule } from '../../shared/shared.module';
import { RequestPoolModule } from '../../request-pool/request-pool.module';


describe('MentorRecordsComponent', () => {
  let component: MentorRecordsComponent;
  let fixture: ComponentFixture<MentorRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RequestPoolModule,
      ],
      declarations: [
        MentorRecordsComponent,
      ],
      providers: [
        TableHeaderSortHelper,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorRecordsComponent);
    component = fixture.componentInstance;
    component.activeSortCategory = {};
    component.sortCategoryValues = {
      name: 'asc',
      mentorships_count: 'asc',
      average_rating: 'asc',
      last_active: 'asc',
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
