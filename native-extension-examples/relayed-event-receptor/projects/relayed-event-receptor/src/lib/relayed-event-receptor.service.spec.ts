import { TestBed } from '@angular/core/testing';

import { RelayedEventReceptorService } from './relayed-event-receptor.service';

describe('RelayedEventReceptorService', () => {
  let service: RelayedEventReceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelayedEventReceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
