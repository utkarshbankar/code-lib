import { TestBed } from '@angular/core/testing';

import { PrittyViewService } from './pritty-view.service';

describe('PrittyViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrittyViewService = TestBed.get(PrittyViewService);
    expect(service).toBeTruthy();
  });
});
