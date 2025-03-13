import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelOnlineDBComponent } from './admin-panel-onlinedb.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelOnlineDBComponent;
  let fixture: ComponentFixture<AdminPanelOnlineDBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPanelOnlineDBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPanelOnlineDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
