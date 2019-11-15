import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVariableComponent } from './single-variable.component';

describe('SingleVariableComponent', () => {
  let component: SingleVariableComponent;
  let fixture: ComponentFixture<SingleVariableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVariableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
