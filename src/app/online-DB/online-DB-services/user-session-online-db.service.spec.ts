import { TestBed } from '@angular/core/testing';

import { UserSessionServiceOnlineDB } from './user-session-online-db.service';

describe('UserSessionService', () => {
  let service: UserSessionServiceOnlineDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSessionServiceOnlineDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
