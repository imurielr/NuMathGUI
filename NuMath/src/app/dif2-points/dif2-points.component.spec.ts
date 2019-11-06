import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dif2PointsComponent } from './dif2-points.component';

describe('Dif2PointsComponent', () => {
  let component: Dif2PointsComponent;
  let fixture: ComponentFixture<Dif2PointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dif2PointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dif2PointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
