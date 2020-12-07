import { TestBed } from '@angular/core/testing';

import { SurveytypeService } from './surveytype.service';

describe('SurveytypeService', () => {
  let service: SurveytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
