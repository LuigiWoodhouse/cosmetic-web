import { TestBed } from '@angular/core/testing';

import { InputSanitizationService } from './input-sanitization.service';

describe('InputSanitizationService', () => {
  let service: InputSanitizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputSanitizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
