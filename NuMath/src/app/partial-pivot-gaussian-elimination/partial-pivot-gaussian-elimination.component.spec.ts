import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialPivotGaussianEliminationComponent } from './partial-pivot-gaussian-elimination.component';

describe('PartialPivotGaussianEliminationComponent', () => {
  let component: PartialPivotGaussianEliminationComponent;
  let fixture: ComponentFixture<PartialPivotGaussianEliminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialPivotGaussianEliminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialPivotGaussianEliminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
