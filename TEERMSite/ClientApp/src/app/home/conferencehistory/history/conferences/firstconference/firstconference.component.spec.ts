import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstconferenceComponent } from './firstconference.component';

describe('FirstconferenceComponent', () => {
  let component: FirstconferenceComponent;
  let fixture: ComponentFixture<FirstconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
