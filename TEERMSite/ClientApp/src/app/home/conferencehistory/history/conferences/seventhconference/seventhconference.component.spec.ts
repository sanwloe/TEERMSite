import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhconferenceComponent } from './seventhconference.component';

describe('SeventhconferenceComponent', () => {
  let component: SeventhconferenceComponent;
  let fixture: ComponentFixture<SeventhconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeventhconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
