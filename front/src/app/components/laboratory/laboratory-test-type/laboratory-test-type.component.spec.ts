import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryTestTypeComponent } from './laboratory-test-type.component';

describe('LaboratoryTestTypeComponent', () => {
  let component: LaboratoryTestTypeComponent;
  let fixture: ComponentFixture<LaboratoryTestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryTestTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryTestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
