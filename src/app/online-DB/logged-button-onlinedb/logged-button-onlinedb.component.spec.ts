import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedButtonOnlinedbComponent } from './logged-button-onlinedb.component';

describe('LoggedButtonOnlinedbComponent', () => {
  let component: LoggedButtonOnlinedbComponent;
  let fixture: ComponentFixture<LoggedButtonOnlinedbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedButtonOnlinedbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedButtonOnlinedbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
