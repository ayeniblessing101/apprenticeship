import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileModalComponent } from './add-file-modal.component';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../../services/files.service';
import { HttpService as Http } from '../../../services/http.service';
import { HttpModule } from '@angular/http';
import { AlertService } from '../../../services/alert.service';
import { SessionService } from '../../../services/session.service';

describe('AddFileModalComponent', () => {
  let component: AddFileModalComponent;
  let fixture: ComponentFixture<AddFileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFileModalComponent],
      imports: [FormsModule, HttpModule],
      providers: [FileService, Http, AlertService, SessionService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
