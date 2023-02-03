import { Injectable } from '@angular/core';
import { DataPart, Part } from './part';
// Data
import storyData from '../data/storyContent.json';

@Injectable({
  providedIn: 'root'
})
export class PartDispatcherService {

  private partsDisplaySize: number; // the number of parts before needing to trigger a refresh
  private usedParts: Part[] = []; 
  
  constructor() {
    this.partsDisplaySize = 10;
  }

  public getParts(): Part[] {
    return [...this.getStoryParts()];
  }

  private getStoryParts(): DataPart[] {
    let parts: Part[] = [];
    let tmp = [...storyData.properties.content];

    tmp.forEach(content => {
      let newPart = new DataPart();
      newPart.setContent(content);
      let skip = false;
      this.usedParts.forEach(part => {
        if (part.content?.sKey === content.sKey) {
          skip = true;
        }
      });
      if (!skip) {
        parts.push(newPart);
        this.usedParts.push(newPart);
      }
    });
    console.log(parts);
    return parts;
  }

  private getRandomParts(): DataPart[] {
    return [];
  }
}
