import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSplineComponent } from './simple-spline.component';

describe('SimpleSplineComponent', () => {
  let component: SimpleSplineComponent;
  let fixture: ComponentFixture<SimpleSplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
