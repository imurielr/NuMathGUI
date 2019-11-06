import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTrapeziumComponent } from './simple-trapezium.component';

describe('SimpleTrapeziumComponent', () => {
  let component: SimpleTrapeziumComponent;
  let fixture: ComponentFixture<SimpleTrapeziumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleTrapeziumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleTrapeziumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
