import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdconferenceComponent } from './thirdconference.component';

describe('ThirdconferenceComponent', () => {
  let component: ThirdconferenceComponent;
  let fixture: ComponentFixture<ThirdconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThirdconferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThirdconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
