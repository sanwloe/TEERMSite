import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EigthconferenceComponent } from './eigthconference.component';

describe('EigthconferenceComponent', () => {
  let component: EigthconferenceComponent;
  let fixture: ComponentFixture<EigthconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EigthconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EigthconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
