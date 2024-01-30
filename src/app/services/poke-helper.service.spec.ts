import { TestBed } from '@angular/core/testing';

import { PokeHelperService } from './poke-helper.service';

describe('PokeHelperService', () => {
  let service: PokeHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
