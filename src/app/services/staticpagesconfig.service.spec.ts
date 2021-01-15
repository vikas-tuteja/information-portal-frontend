import { TestBed } from '@angular/core/testing';

import { StaticpagesconfigService } from './staticpagesconfig.service';

describe('StaticpagesconfigService', () => {
  let service: StaticpagesconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticpagesconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
