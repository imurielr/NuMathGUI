import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSimpson38Component } from './general-simpson38.component';

describe('GeneralSimpson38Component', () => {
  let component: GeneralSimpson38Component;
  let fixture: ComponentFixture<GeneralSimpson38Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSimpson38Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSimpson38Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
