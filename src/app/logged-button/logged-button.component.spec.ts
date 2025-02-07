import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedButtonComponent } from './logged-button.component';

describe('LoggedButtonComponent', () => {
  let component: LoggedButtonComponent;
  let fixture: ComponentFixture<LoggedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
