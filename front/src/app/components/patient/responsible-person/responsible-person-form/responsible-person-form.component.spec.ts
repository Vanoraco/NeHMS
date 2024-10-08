import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblePersonFormComponent } from './responsible-person-form.component';

describe('ResponsiblePersonFormComponent', () => {
  let component: ResponsiblePersonFormComponent;
  let fixture: ComponentFixture<ResponsiblePersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiblePersonFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsiblePersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
