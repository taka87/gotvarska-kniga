import { TestBed } from '@angular/core/testing';

import { SupabaseContactFormService } from './supabase-contact-form.service';

describe('SupabaseContactFormService', () => {
  let service: SupabaseContactFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseContactFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
