import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiferentiationComponent } from './diferentiation.component';

describe('DiferentiationComponent', () => {
  let component: DiferentiationComponent;
  let fixture: ComponentFixture<DiferentiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiferentiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiferentiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
