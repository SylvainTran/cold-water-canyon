import { Component, Output } from '@angular/core';
import { PageControllerService } from './core/page-controller.service';
import { StoryCharacter } from './core/content';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'angular-test';
  
  // States (to move somewhere?)
  @Output()
  activeStoryProfile: string = "";

  @Output()
  activeStoryCharacter: string = "";

  activeStoryCharacters: StoryCharacter[] = [];

  tiles: Tile[] = [
    {id: "titleAndLogo", text: '1', cols: 1, rows: 1, color: 'black'},
    {id: "searchBar", text: '2', cols: 1, rows: 1, color: 'black'},
    {id: "topRightCol", text: '3', cols: 1, rows: 1, color: 'black'},
    {id: "firstCol", text: '4', cols: 1, rows: 2, color: 'black'},
    {id: "mainContent", text: '5', cols: 1, rows: 4, color: 'black'},
    {id: "rightCol", text: '6', cols: 1, rows: 5, color: 'black'},
    {id: "footerFirstCol", text: '7', cols: 1, rows: 1, color: 'black'}
  ];

  constructor(public pageControllerService: PageControllerService) {}
  
  public setActiveStoryProfile(profile: string): void {
    this.activeStoryProfile = profile;
    this.activeStoryCharacters = this.getActiveStoryCharacters();
  }

  public setActiveCharacter(character: string): void {
    this.activeStoryCharacter = character;
    this.activeStoryCharacters = [];
  }

  public getActiveStoryCharacters(): StoryCharacter[] {
    return this.pageControllerService.partDispatcherService.getCharacters(this.activeStoryProfile);
  }
}
