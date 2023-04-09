import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinfoComponent } from './payinfo.component';

describe('PayinfoComponent', () => {
  let component: PayinfoComponent;
  let fixture: ComponentFixture<PayinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
