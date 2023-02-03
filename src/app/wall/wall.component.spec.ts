import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallComponent } from './wall.component';
import { Environment } from '../env/environment.development';
import { PostComponent } from '../post/post.component';

describe('WallComponent', () => {
  let component: WallComponent;
  let fixture: ComponentFixture<WallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallComponent, PostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should get all predefined posts on ngOnInit', () => {
    expect(component.posts.length).toBe(Environment.nStaticStoryPosts); 
  });
});
