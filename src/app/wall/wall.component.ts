import { Component, OnInit, Output } from '@angular/core';
import { Post } from '../core/post';
import { PageControllerService } from '../core/page-controller.service';
import { DataPart } from '../core/part';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.less']
})
export class WallComponent implements OnInit {
  @Output()
  posts: Post[] = [];

  constructor(private pageControllerService: PageControllerService) {

  }

  ngOnInit(): void {
    this.getPosts();
  }

  private getPosts(): void {
    const parts = this.pageControllerService.partDispatcherService.getParts();

    parts.forEach((part: DataPart) => {
      let post = part.content;
      console.log("Part: " + post?.body);
      if (post) {
        this.posts.push(post);
      }
    });
  }
}
