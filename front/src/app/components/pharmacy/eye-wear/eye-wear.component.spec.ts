import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeWearComponent } from './eye-wear.component';

describe('EyeWearComponent', () => {
  let component: EyeWearComponent;
  let fixture: ComponentFixture<EyeWearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EyeWearComponent]
    });
    fixture = TestBed.createComponent(EyeWearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
