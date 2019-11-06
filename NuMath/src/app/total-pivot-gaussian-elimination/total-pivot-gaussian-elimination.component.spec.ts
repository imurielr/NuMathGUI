import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalPivotGaussianEliminationComponent } from './total-pivot-gaussian-elimination.component';

describe('TotalPivotGaussianEliminationComponent', () => {
  let component: TotalPivotGaussianEliminationComponent;
  let fixture: ComponentFixture<TotalPivotGaussianEliminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalPivotGaussianEliminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalPivotGaussianEliminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
