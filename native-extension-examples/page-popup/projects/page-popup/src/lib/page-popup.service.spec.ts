import { TestBed } from '@angular/core/testing';

import { PagePopupService } from './page-popup.service';

describe('PagePopupService', () => {
  let service: PagePopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
