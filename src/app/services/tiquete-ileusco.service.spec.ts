import { TestBed } from '@angular/core/testing';

import { TiqueteIleuscoService } from './tiquete-ileusco.service';

describe('TiqueteIleuscoService', () => {
  let service: TiqueteIleuscoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiqueteIleuscoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
