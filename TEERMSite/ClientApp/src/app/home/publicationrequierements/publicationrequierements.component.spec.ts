import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationrequierementsComponent } from './publicationrequierements.component';

describe('PublicationrequierementsComponent', () => {
  let component: PublicationrequierementsComponent;
  let fixture: ComponentFixture<PublicationrequierementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationrequierementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationrequierementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
