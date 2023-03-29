import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramcomitteeComponent } from './programcomittee.component';

describe('ProgramcomitteeComponent', () => {
  let component: ProgramcomitteeComponent;
  let fixture: ComponentFixture<ProgramcomitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramcomitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramcomitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
