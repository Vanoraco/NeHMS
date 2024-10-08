import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardtypeComponent } from './wardtype.component';

describe('WardtypeComponent', () => {
  let component: WardtypeComponent;
  let fixture: ComponentFixture<WardtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WardtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
