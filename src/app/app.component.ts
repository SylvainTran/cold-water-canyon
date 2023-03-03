import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { PageControllerService } from './core/page-controller.service';
import { StoryCharacter } from './core/content';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('toggleLiVisible', [
      state('showLi', style({
        listStyleType: 'circle'
      })),
      state('hideLi', style({
        listStyleType: 'none'
      }))
    ]),
    trigger('moveRight', [
      state('idle', style({
        color: 'rgb(30,30,30)',
        position: 'relative',
        left: '0px',
      })),
      state('movedRight', style({
        color: 'white',
        position: 'relative',
        left: '100px'
      })),
      transition('idle => movedRight', [
        animate('1s')
      ]),
      transition('movedRight => idle', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'angular-test';
  
  // States (to move somewhere?)
  @Output()
  activeStoryProfile: string = "";

  @Output()
  activeStoryCharacter: string = "";

  activeStoryCharacters: StoryCharacter[] = [];

  tiles: Tile[] = [
    {id: "titleAndLogo", text: '1', cols: 1, rows: 1, color: 'rgb(18, 18, 18);'},
    {id: "searchBar", text: '2', cols: 1, rows: 1, color: 'rgb(18, 18, 18);'},
    {id: "topRightCol", text: '3', cols: 1, rows: 1, color: 'rgb(18, 18, 18);'},
    {id: "firstCol", text: '4', cols: 1, rows: 2, color: 'rgb(18, 18, 18);'},
    {id: "mainContent", text: '5', cols: 1, rows: 4, color: 'rgb(18, 18, 18);'},
    {id: "rightCol", text: '6', cols: 1, rows: 5, color: 'rgb(18, 18, 18);'},
    {id: "footerFirstCol", text: '7', cols: 1, rows: 1, color: 'rgb(18, 18, 18);'}
  ];
  
  @ViewChild('mainContentContainer') mainContentContainerRef: ElementRef | undefined;

  activeHoveredElement: string = "";
  isHoveringOverCharacter: boolean = false;

  showIntroFadeAnimation: boolean = false;

  @Output()
  playedIntroFadeAnimation: boolean = false;

  constructor(public pageControllerService: PageControllerService) {}
  
  ngAfterViewInit() {
    this.resetScrollTopPosition();
  }

  public setActiveStoryProfile(profile: string): void {
    this.activeStoryProfile = profile;
    this.activeStoryCharacters = this.getActiveStoryCharacters();
  }

  public setActiveCharacter(character: string): void {
    this.activeStoryCharacter = character;
    this.activeStoryCharacters = [];

    // Anims
    this.onIntroAnimationStarted();
  }

  public getActiveStoryCharacters(): StoryCharacter[] {
    return this.pageControllerService.partDispatcherService.getCharacters(this.activeStoryProfile);
  }

  public getActiveStoryName(): string {
    return this.pageControllerService.partDispatcherService.getActiveStoryName(this.activeStoryProfile);
  }

  public switchUser(): void {
    this.activeStoryCharacter = "";
    this.activeStoryCharacters = this.getActiveStoryCharacters();
    this.playedIntroFadeAnimation = false;
    this.setHoveringOverCharacter(false);
  }

  public switchStory(): void {
    this.activeStoryProfile = "";
    this.activeStoryCharacter = "";
    this.activeStoryCharacters = [];
    this.playedIntroFadeAnimation = false;
    this.setHoveringOverCharacter(false);
  }
  
  public resetScrollTopPosition(): void {
    if (this.mainContentContainerRef) {
      this.mainContentContainerRef.nativeElement.scrollTop = 0;
    }
  }

  public setHover(element: string): void {
    this.activeHoveredElement = element;
  }

  public unsetHover(): void {
    this.activeHoveredElement = "";
  }

  public setHoveringOverCharacter(state: boolean): void {
    this.isHoveringOverCharacter = state;
  }

  public onIntroAnimationStarted(): void {
    this.showIntroFadeAnimation = true;
    setTimeout(() => {
      this.onIntroAnimationDone();
    }, 5000);
  }

  public onIntroAnimationDone(): void {
    this.showIntroFadeAnimation = false;
    this.playedIntroFadeAnimation = true;
    this.pageControllerService.onIntroScreenOver.emit();
  }
}
