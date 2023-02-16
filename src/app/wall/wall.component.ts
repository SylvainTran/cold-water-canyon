import { AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Post } from '../core/post';
import { PageControllerService } from '../core/page-controller.service';
import { DataPart } from '../core/part';
import { StoryContent } from '../core/content';

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
  }
}
