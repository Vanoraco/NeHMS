import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbillscheduleFormComponent } from './addbillschedule-form.component';

describe('AddbillscheduleFormComponent', () => {
  let component: AddbillscheduleFormComponent;
  let fixture: ComponentFixture<AddbillscheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbillscheduleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbillscheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
