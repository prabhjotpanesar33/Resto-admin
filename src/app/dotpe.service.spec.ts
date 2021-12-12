import { TestBed } from '@angular/core/testing';

import { DotpeService } from './dotpe.service';

describe('DotpeService', () => {
  let service: DotpeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DotpeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
