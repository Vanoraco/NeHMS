import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLabComponent } from './bill-lab.component';

describe('BillLabComponent', () => {
  let component: BillLabComponent;
  let fixture: ComponentFixture<BillLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillLabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
