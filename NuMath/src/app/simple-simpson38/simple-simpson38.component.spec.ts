import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSimpson38Component } from './simple-simpson38.component';

describe('SimpleSimpson38Component', () => {
  let component: SimpleSimpson38Component;
  let fixture: ComponentFixture<SimpleSimpson38Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSimpson38Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSimpson38Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
