import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceprogramComponent } from './conferenceprogram.component';

describe('ConferenceprogramComponent', () => {
  let component: ConferenceprogramComponent;
  let fixture: ComponentFixture<ConferenceprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConferenceprogramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
