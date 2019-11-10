import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CubicSplineComponent } from './cubic-spline.component';

describe('CubicSplineComponent', () => {
  let component: CubicSplineComponent;
  let fixture: ComponentFixture<CubicSplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CubicSplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CubicSplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
