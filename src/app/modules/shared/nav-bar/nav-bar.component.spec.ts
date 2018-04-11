import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

import { NavBarComponent } from './nav-bar.component';
import { RouterLinkStubDirective } from '../../../stubs/router-stubs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavBarComponent,
        RouterLinkStubDirective,
      ],
      providers: [{ provide: Router, useValue: mockRouter }],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('can Link to request-pool pages', () => {
    // find DebugElements with an attached RouterLinkStubDirective
    const linkDescription = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    // get the attached link directive instances using the DebugElement injectors
    const links = linkDescription.map(description => description.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);

    expect(links.length).toBe(4, 'should have 4 links');
    expect(links[0].linkParams).toEqual(['request-pool'], '1st link should go to Pool page');
    expect(links[1].linkParams).toEqual(['request-pool/pending'], '2nd link should go to Pending page');
    expect(links[2].linkParams).toEqual(['request-pool/in-progress'], '3rd link should go to In-Progress page');
    expect(links[3].linkParams).toEqual(['request-pool/history'], '3rd link should go to History page');
  });

});
