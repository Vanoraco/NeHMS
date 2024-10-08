import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryFamilyComponent } from './medical-history-family.component';

describe('MedicalHistoryFamilyComponent', () => {
  let component: MedicalHistoryFamilyComponent;
  let fixture: ComponentFixture<MedicalHistoryFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
