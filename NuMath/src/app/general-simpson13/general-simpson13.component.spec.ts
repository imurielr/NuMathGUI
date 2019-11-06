import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSimpson13Component } from './general-simpson13.component';

describe('GeneralSimpson13Component', () => {
  let component: GeneralSimpson13Component;
  let fixture: ComponentFixture<GeneralSimpson13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSimpson13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSimpson13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
