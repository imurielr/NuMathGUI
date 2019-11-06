import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dif5PointsComponent } from './dif5-points.component';

describe('Dif5PointsComponent', () => {
  let component: Dif5PointsComponent;
  let fixture: ComponentFixture<Dif5PointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dif5PointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dif5PointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
