import { TestBed } from '@angular/core/testing';
import { MakepdfService } from './makepdf.service';

describe('MakepdfService', () => {
  let service: MakepdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakepdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
