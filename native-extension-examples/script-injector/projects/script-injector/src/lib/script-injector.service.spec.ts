import { TestBed } from '@angular/core/testing';

import { ScriptInjectorService } from './script-injector.service';

describe('ScriptInjectorService', () => {
  let service: ScriptInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
