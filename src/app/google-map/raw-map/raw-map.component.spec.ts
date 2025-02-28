import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMapComponent } from './raw-map.component';

describe('RawMapComponent', () => {
  let component: RawMapComponent;
  let fixture: ComponentFixture<RawMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
