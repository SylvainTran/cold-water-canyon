import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Post } from '../core/post';
import { PageControllerService } from '../core/page-controller.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.less']
})
export class WallComponent implements OnChanges {

  @Input()
  activeStoryProfile: string = "";

  @Input()
  activeStoryCharacter: string = "";

  @Output()
  posts: Post[] = [];

  @Input()
  playedIntroFadeAnimation: boolean = false;

  constructor(private pageControllerService: PageControllerService) {}
  
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['playedIntroFadeAnimation']) {
      this.setPosts();
    }
  }

  // Update the posts' order in the sequence using the ranks (who owns it)
  // Re-read the story sequence in order to determine the final order
  public setPosts(): void {
    this.posts = this.pageControllerService.partDispatcherService.arrangePosts(this.activeStoryProfile, this.activeStoryCharacter);
  }
}
