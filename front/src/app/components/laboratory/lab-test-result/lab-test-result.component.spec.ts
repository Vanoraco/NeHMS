import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestResultComponent } from './lab-test-result.component';

describe('LabTestResultComponent', () => {
  let component: LabTestResultComponent;
  let fixture: ComponentFixture<LabTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabTestResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
