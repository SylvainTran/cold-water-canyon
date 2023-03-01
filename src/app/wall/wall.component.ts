import { Component, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Post } from '../core/post';
import { PageControllerService } from '../core/page-controller.service';
import { Content } from '../core/content';

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

  constructor(private pageControllerService: PageControllerService) {}
  
  ngOnChanges(changes: SimpleChanges): void {    
    // this.posts = this.pageControllerService.partDispatcherService.getPosts(this.activeStoryProfile, this.activeStoryCharacter);

    if (changes['activeStoryCharacter']) {
      this.posts = this.pageControllerService.partDispatcherService.arrangePosts(this.activeStoryProfile, this.activeStoryCharacter);
    }

    // Update the posts' order in the sequence using the ranks (who owns it)
    
    // Re-read the story sequence in order to determine the final order

    // Insert the random posts anywhere in that sequence
  }
}
