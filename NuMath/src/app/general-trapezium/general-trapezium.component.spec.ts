import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTrapeziumComponent } from './general-trapezium.component';

describe('GeneralTrapeziumComponent', () => {
  let component: GeneralTrapeziumComponent;
  let fixture: ComponentFixture<GeneralTrapeziumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTrapeziumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTrapeziumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
