import { TestBed } from '@angular/core/testing';

import { BabylonjsService } from './babylonjs.service';

describe('BabylonjsService', () => {
  let service: BabylonjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BabylonjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
