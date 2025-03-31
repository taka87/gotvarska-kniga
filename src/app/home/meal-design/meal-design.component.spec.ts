import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDesignComponent } from './meal-design.component';

describe('MealDesignComponent', () => {
  let component: MealDesignComponent;
  let fixture: ComponentFixture<MealDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealDesignComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
