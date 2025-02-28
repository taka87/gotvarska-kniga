import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLocalRecipesComponent } from './show-local-recipes.component';

describe('ShowLocalRecipesComponent', () => {
  let component: ShowLocalRecipesComponent;
  let fixture: ComponentFixture<ShowLocalRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLocalRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLocalRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
