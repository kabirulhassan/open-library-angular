import { TestBed } from '@angular/core/testing';

import { TransformAuthorsService } from './transform-authors.service';

describe('TransformAuthorsService', () => {
  let service: TransformAuthorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformAuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
