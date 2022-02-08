import { TestBed } from '@angular/core/testing';

import { InjectScriptService } from './inject-script.service';

describe('InjectScriptService', () => {
  let service: InjectScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
