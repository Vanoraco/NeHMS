import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedsupplierFormComponent } from './medsupplier-form.component';

describe('MedsupplierFormComponent', () => {
  let component: MedsupplierFormComponent;
  let fixture: ComponentFixture<MedsupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedsupplierFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedsupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
