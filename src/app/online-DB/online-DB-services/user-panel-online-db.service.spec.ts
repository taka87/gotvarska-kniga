import { TestBed } from '@angular/core/testing';

import { UserPanelServiceOnlineDB } from './user-panel-online-db.service';

describe('UserPanelService', () => {
  let service: UserPanelServiceOnlineDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPanelServiceOnlineDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
