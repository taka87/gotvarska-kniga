import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaindishesComponent } from './maindishes.component';

describe('MaindishesComponent', () => {
  let component: MaindishesComponent;
  let fixture: ComponentFixture<MaindishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaindishesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaindishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
