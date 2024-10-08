import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabtestResultFormComponent } from './labtest-result-form.component';

describe('LabtestResultFormComponent', () => {
  let component: LabtestResultFormComponent;
  let fixture: ComponentFixture<LabtestResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabtestResultFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabtestResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
