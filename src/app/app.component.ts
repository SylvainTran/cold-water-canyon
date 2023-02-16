import { Component, Output } from '@angular/core';
import { PageControllerService } from './core/page-controller.service';
import { StoryCharacter } from './core/content';

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

  constructor(public pageControllerService: PageControllerService) {}
  
  public setActiveStoryProfile(profile: string): void {
    this.activeStoryProfile = profile;
    console.log("active myth profile= " + this.activeStoryProfile);
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
