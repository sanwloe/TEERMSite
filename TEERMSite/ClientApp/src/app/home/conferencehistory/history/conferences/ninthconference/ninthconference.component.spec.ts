import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinthconferenceComponent } from './ninthconference.component';

describe('NinthconferenceComponent', () => {
  let component: NinthconferenceComponent;
  let fixture: ComponentFixture<NinthconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinthconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinthconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
