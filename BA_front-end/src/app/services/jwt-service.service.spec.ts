/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtServiceService } from './jwt-service.service';

describe('Service: JwtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtServiceService]
    });
  });

  it('should ...', inject([JwtServiceService], (service: JwtServiceService) => {
    expect(service).toBeTruthy();
  }));
});
