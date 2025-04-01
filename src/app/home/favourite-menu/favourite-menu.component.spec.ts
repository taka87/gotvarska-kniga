import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMenuComponent } from './favourite-menu.component';

describe('FavouriteMenuComponent', () => {
  let component: FavouriteMenuComponent;
  let fixture: ComponentFixture<FavouriteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
