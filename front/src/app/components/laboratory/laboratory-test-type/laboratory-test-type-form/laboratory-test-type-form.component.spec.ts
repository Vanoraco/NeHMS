import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryTestTypeFormComponent } from './laboratory-test-type-form.component';

describe('LaboratoryTestTypeFormComponent', () => {
  let component: LaboratoryTestTypeFormComponent;
  let fixture: ComponentFixture<LaboratoryTestTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryTestTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryTestTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
