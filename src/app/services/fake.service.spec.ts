import { TestBed } from '@angular/core/testing';
import { FakeService } from './fake.service';

describe('ProductFakeService', () => {
  let service: FakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
