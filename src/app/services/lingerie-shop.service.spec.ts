import { TestBed } from '@angular/core/testing';

import { LingerieShopService } from './lingerie-shop.service';

describe('LingerieShopService', () => {
  let service: LingerieShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LingerieShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
