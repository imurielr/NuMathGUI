import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSimpson13Component } from './simple-simpson13.component';

describe('SimpleSimpson13Component', () => {
  let component: SimpleSimpson13Component;
  let fixture: ComponentFixture<SimpleSimpson13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSimpson13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSimpson13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
