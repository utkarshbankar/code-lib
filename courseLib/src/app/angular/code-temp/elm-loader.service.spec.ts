import { TestBed } from '@angular/core/testing';

import { ElmLoaderService } from './elm-loader.service';

describe('ElmLoaderService', () => {
  let service: ElmLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElmLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
