import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondconferenceComponent } from './secondconference.component';

describe('SecondconferenceComponent', () => {
  let component: SecondconferenceComponent;
  let fixture: ComponentFixture<SecondconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
