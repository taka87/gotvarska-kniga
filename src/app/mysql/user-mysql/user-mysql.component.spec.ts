import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMysqlComponent } from './user-mysql.component';

describe('UserMysqlComponent', () => {
  let component: UserMysqlComponent;
  let fixture: ComponentFixture<UserMysqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMysqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMysqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
