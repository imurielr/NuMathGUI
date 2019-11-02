import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVariableEqComponent } from './single-variable-eq.component';

describe('SingleVariableEqComponent', () => {
  let component: SingleVariableEqComponent;
  let fixture: ComponentFixture<SingleVariableEqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVariableEqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVariableEqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
