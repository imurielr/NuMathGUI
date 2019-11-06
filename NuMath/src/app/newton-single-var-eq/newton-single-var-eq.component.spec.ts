import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtonSingleVarEqComponent } from './newton-single-var-eq.component';

describe('NewtonSingleVarEqComponent', () => {
  let component: NewtonSingleVarEqComponent;
  let fixture: ComponentFixture<NewtonSingleVarEqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtonSingleVarEqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtonSingleVarEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
