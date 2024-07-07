import { TestBed } from '@angular/core/testing';

import { PageRouteService } from './page-route.service';

describe('PageRouteService', () => {
  let service: PageRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
