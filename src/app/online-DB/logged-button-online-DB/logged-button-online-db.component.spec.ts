import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedButtonMysqlqlComponent } from './logged-button-mysql.component';

describe('LoggedButtonMysqlqlComponent', () => {
  let component: LoggedButtonMysqlqlComponent;
  let fixture: ComponentFixture<LoggedButtonMysqlqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedButtonMysqlqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedButtonMysqlqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
