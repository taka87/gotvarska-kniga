import { TestBed } from '@angular/core/testing';

import { AuthServiceOnlineDB } from './auth-service-online-db.service';

describe('AuthServiceService', () => {
  let service: AuthServiceOnlineDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceOnlineDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
