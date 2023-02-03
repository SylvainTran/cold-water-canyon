import { Injectable } from '@angular/core';
import { OnInit } from "@angular/core";
import { PartDispatcherService } from './part-dispatcher.service';

@Injectable({
  providedIn: 'root'
})
export class PageControllerService implements OnInit {

  constructor(public partDispatcherService: PartDispatcherService) {
    
  }
  
  ngOnInit(): void {
  }
}
