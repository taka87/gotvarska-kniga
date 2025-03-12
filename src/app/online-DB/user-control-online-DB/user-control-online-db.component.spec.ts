import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlOnlineDBComponent } from './user-control-online-db.component';

describe('UserControlOnlineDBComponent', () => {
  let component: UserControlOnlineDBComponent;
  let fixture: ComponentFixture<UserControlOnlineDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserControlOnlineDBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserControlOnlineDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
