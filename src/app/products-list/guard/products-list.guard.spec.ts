import { TestBed } from '@angular/core/testing';

import { ProductsListGuard } from './products-list.guard';

describe('ProductsListGuard', () => {
  let guard: ProductsListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductsListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
