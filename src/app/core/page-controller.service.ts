import { EventEmitter, Injectable } from '@angular/core';
import { PartDispatcherService } from './part-dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class PageControllerService {

  // Intro done event
  onIntroScreenOver: EventEmitter<any> = new EventEmitter();

  constructor(public partDispatcherService: PartDispatcherService) {}
}
