import { Injectable } from '@angular/core';
import { PartDispatcherService } from './part-dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class PageControllerService {

  constructor(public partDispatcherService: PartDispatcherService) {
    
  }
}
