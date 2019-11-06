import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGaussianEliminationComponent } from './simple-gaussian-elimination.component';

describe('SimpleGaussianEliminationComponent', () => {
  let component: SimpleGaussianEliminationComponent;
  let fixture: ComponentFixture<SimpleGaussianEliminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGaussianEliminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGaussianEliminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
