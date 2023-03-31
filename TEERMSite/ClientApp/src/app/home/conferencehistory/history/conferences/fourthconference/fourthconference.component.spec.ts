import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthconferenceComponent } from './fourthconference.component';

describe('FourthconferenceComponent', () => {
  let component: FourthconferenceComponent;
  let fixture: ComponentFixture<FourthconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourthconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourthconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
