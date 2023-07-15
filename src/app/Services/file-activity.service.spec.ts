import { TestBed } from '@angular/core/testing';

import { FileActivityService } from './file-activity.service';

describe('FileActivityService', () => {
  let service: FileActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
