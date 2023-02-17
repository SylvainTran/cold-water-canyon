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
    this.posts = this.pageControllerService.partDispatcherService.getPosts(this.activeStoryProfile, this.activeStoryCharacter);

    const activeUserPosts: Content[] = this.pageControllerService.partDispatcherService.getActiveUserPosts(this.activeStoryProfile, this.activeStoryCharacter);
    const nonActiveUserPosts: Content[] = this.pageControllerService.partDispatcherService.getAllNonActiveUserPosts(this.activeStoryProfile, this.activeStoryCharacter);

    this.pageControllerService.partDispatcherService.sortPostRelationMapping(activeUserPosts, nonActiveUserPosts);

    // Update the next/prev keys by reading the nonActiveUserPosts relative to/into the activeUserPosts sequence
    
    // Re-read the story sequence in order to determine the final order
    
    // Insert the random posts anywhere in that sequence
  }
}
