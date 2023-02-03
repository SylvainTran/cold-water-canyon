import { TestBed } from '@angular/core/testing';

import { PartDispatcherService } from './part-dispatcher.service';
import { Environment } from '../env/environment.development';

describe('PageDispatcherService', () => {
  let service: PartDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('getStoryParts should return all story parts', () => {
    expect(service.getParts().length).toBe(Environment.nStaticStoryPosts);
  });  
});