import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRecommendationsComponent } from './add-edit-recommendations.component';

describe('AddEditRecommendationsComponent', () => {
  let component: AddEditRecommendationsComponent;
  let fixture: ComponentFixture<AddEditRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
