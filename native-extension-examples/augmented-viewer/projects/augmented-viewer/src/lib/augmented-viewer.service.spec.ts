import { TestBed } from '@angular/core/testing';

import { AugmentedViewerService } from './augmented-viewer.service';

describe('AugmentedViewerService', () => {
  let service: AugmentedViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AugmentedViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
