import { TestBed } from '@angular/core/testing';

import { UserRecipeServiceOnlineDB } from './user-recipe-online-db.service';

describe('UserRecipeService', () => {
  let service: UserRecipeServiceOnlineDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRecipeServiceOnlineDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
