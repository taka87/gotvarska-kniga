import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelOnlineDBComponent } from './user-panel-onlinedb.component';

describe('UserPanelComponent', () => {
  let component: UserPanelOnlineDBComponent;
  let fixture: ComponentFixture<UserPanelOnlineDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPanelOnlineDBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPanelOnlineDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
