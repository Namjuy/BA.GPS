/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenericServiceService } from './generic-service.service';

describe('Service: GenericService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericServiceService]
    });
  });

  it('should ...', inject([GenericServiceService], (service: GenericServiceService) => {
    expect(service).toBeTruthy();
  }));
});
