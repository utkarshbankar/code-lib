import { TestBed } from '@angular/core/testing';

import { ElmRegistryService } from './elm-registry.service';

describe('ElmRegistryService', () => {
  let service: ElmRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElmRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
