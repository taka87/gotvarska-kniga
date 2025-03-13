import { TestBed } from '@angular/core/testing';

import { AdminServiceOnlineDB } from './admin-service-online-db.service';

describe('AdminServiceService', () => {
  let service: AdminServiceOnlineDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminServiceOnlineDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
