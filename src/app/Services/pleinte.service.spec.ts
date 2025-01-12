import { TestBed } from '@angular/core/testing';

import { PleinteService } from './pleinte.service';

describe('PleinteService', () => {
  let service: PleinteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PleinteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
