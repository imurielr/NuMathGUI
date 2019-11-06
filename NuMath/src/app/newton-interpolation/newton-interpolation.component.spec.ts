import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtonInterpolationComponent } from './newton-interpolation.component';

describe('NewtonInterpolationComponent', () => {
  let component: NewtonInterpolationComponent;
  let fixture: ComponentFixture<NewtonInterpolationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtonInterpolationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtonInterpolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
