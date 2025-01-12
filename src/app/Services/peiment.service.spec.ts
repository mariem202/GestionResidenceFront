import { TestBed } from '@angular/core/testing';

import { PeimentService } from './peiment.service';

describe('PeimentService', () => {
  let service: PeimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
