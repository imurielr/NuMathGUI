import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadraticSplineComponent } from './quadratic-spline.component';

describe('QuadraticSplineComponent', () => {
  let component: QuadraticSplineComponent;
  let fixture: ComponentFixture<QuadraticSplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadraticSplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadraticSplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
