import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreExamCheckUpComponent } from './pre-exam-check-up.component';

describe('PreExamCheckUpComponent', () => {
  let component: PreExamCheckUpComponent;
  let fixture: ComponentFixture<PreExamCheckUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreExamCheckUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreExamCheckUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
