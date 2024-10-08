import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCategoryFormComponent } from './medicine-category-form.component';

describe('MedicineCategoryFormComponent', () => {
  let component: MedicineCategoryFormComponent;
  let fixture: ComponentFixture<MedicineCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
