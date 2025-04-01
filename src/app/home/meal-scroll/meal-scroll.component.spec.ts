import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealScrollComponent } from './meal-scroll.component';

describe('MealScrollComponent', () => {
  let component: MealScrollComponent;
  let fixture: ComponentFixture<MealScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
