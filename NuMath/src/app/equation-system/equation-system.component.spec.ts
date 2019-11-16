import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquationSystemComponent } from './equation-system.component';

describe('EquationSystemComponent', () => {
  let component: EquationSystemComponent;
  let fixture: ComponentFixture<EquationSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquationSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquationSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
