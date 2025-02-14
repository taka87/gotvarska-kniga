import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlMysqlComponent } from './user-control-mysql.component';

describe('UserControlMysqlComponent', () => {
  let component: UserControlMysqlComponent;
  let fixture: ComponentFixture<UserControlMysqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserControlMysqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserControlMysqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
