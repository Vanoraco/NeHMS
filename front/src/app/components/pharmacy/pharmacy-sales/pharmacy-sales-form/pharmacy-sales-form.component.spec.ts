import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySalesFormComponent } from './pharmacy-sales-form.component';

describe('PharmacySalesFormComponent', () => {
  let component: PharmacySalesFormComponent;
  let fixture: ComponentFixture<PharmacySalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacySalesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySalesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
