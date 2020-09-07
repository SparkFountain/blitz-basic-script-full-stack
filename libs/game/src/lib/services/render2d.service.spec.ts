import { TestBed } from '@angular/core/testing';

import { Render2dService } from './render2d.service';

describe('Render2dService', () => {
  let service: Render2dService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Render2dService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
