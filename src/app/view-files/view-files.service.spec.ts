import { TestBed } from '@angular/core/testing';

import { ViewFilesService } from './view-files.service';

describe('ViewFilesService', () => {
  let service: ViewFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
