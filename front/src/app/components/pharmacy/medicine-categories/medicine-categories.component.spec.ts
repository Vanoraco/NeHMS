import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineCategoriesComponent } from './medicine-categories.component';

describe('MedicineCategoriesComponent', () => {
  let component: MedicineCategoriesComponent;
  let fixture: ComponentFixture<MedicineCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
