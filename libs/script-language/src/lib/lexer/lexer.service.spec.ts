import { TestBed } from '@angular/core/testing';

import { LexerService } from './lexer.service';

describe('LexerService', () => {
  let service: LexerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(LexerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
