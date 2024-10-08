import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillScheduleFormComponent } from './bill-schedule-form.component';

describe('BillScheduleFormComponent', () => {
  let component: BillScheduleFormComponent;
  let fixture: ComponentFixture<BillScheduleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillScheduleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
