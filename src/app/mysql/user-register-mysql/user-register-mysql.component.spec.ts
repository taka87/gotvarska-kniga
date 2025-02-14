import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterMysqlComponent } from './user-register-mysql.component';

describe('UserRegisterMysqlComponent', () => {
  let component: UserRegisterMysqlComponent;
  let fixture: ComponentFixture<UserRegisterMysqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRegisterMysqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegisterMysqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
