import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthconferenceComponent } from './sixthconference.component';

describe('SixthconferenceComponent', () => {
  let component: SixthconferenceComponent;
  let fixture: ComponentFixture<SixthconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixthconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SixthconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
