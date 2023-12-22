import { TestBed } from '@angular/core/testing';

import { ApiPokedexService } from './api-pokedex.service';

describe('ApiPokedexService', () => {
  let service: ApiPokedexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPokedexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
