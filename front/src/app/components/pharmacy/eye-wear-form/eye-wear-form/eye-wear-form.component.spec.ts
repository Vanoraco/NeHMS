import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeWearFormComponent } from './eye-wear-form.component';

describe('EyeWearFormComponent', () => {
  let component: EyeWearFormComponent;
  let fixture: ComponentFixture<EyeWearFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyeWearFormComponent]
    });
    fixture = TestBed.createComponent(EyeWearFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
