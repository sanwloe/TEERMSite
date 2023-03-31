import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthconferenceComponent } from './fifthconference.component';

describe('FifthconferenceComponent', () => {
  let component: FifthconferenceComponent;
  let fixture: ComponentFixture<FifthconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifthconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
