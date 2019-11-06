import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dif3PointsComponent } from './dif3-points.component';

describe('Dif3PointsComponent', () => {
  let component: Dif3PointsComponent;
  let fixture: ComponentFixture<Dif3PointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dif3PointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dif3PointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
