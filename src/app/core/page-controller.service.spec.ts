import { PageControllerService } from './page-controller.service';
import { PartDispatcherService } from './part-dispatcher.service';

describe('PageControllerService', () => {
  it('should create an instance', () => {
    expect(new PageControllerService(new PartDispatcherService())).toBeTruthy();
  });
});
