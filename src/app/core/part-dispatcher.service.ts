import { Injectable } from '@angular/core';
import { identity } from 'rxjs';

// Data
import storyData from '../data/storyContent.json';
import { Content, StoryCharacter, StoryContent } from './content';

@Injectable({
  providedIn: 'root'
})
export class PartDispatcherService {

  public getStories(): StoryContent[] {
    return storyData.properties.content.stories;
  }

  public getCharacters(storyKey: String): StoryCharacter[] {
    let characters: StoryCharacter[] = [];
    this.getStories().forEach(story => {
      if (story.name === storyKey) {
        characters = story.characters;
      }
    });
    return characters;
  }

  public getPosts(storyKey: String, characterName: String): Content[] {
    let posts: Content[] = [];
    this.getCharacters(storyKey).forEach(character => {
      if (character.name === characterName) {
        posts = character.posts;
      }
    });
    return posts;
  }

  public buildPostHashMap(storyKey: string, activeCharacterProfile: string): Map<string, Content> {
    const allPosts: Content[] = this.getPosts(storyKey, activeCharacterProfile);
    let hashMap = new Map();
    allPosts.forEach((post: Content) => {
      hashMap.set(post.sKey, post);
    });
    return hashMap;
  }
  
  public buildPostHashMapUsingContent(posts: Content[]): Map<string, Content> {
    let hashMap = new Map();
    posts.forEach((post: Content) => {
      hashMap.set(post.sKey, post);
    });
    return hashMap;
  }

  public getAllPostRelationMapping(storyKey: string, activeCharacterProfile: string): Content[] {
    // Get current active profile user key
    // Build relation to that user with every other user in the story
    // Relevant mappings have a previous or next whose character name is the active user
    const allPosts: Content[] = this.getPosts(storyKey, activeCharacterProfile);
    let output: Content[] = [];

    const hashMap = this.buildPostHashMap(storyKey, activeCharacterProfile);
    allPosts.forEach(post => {
      const prev: Content | undefined = hashMap.get(post.previous);
      const next: Content | undefined = hashMap.get(post.next);
      if (!output.includes(post) && (post.author === activeCharacterProfile || prev?.author === activeCharacterProfile || next?.author === activeCharacterProfile)) {
        output.push(post);
      }
    });
    //output.forEach(o=>console.log(o.body));
    return output;
  }

  public getActiveUserPosts(storyKey: string, activeCharacterProfile: string): Content[] {
    const allPosts: Content[] = this.getPosts(storyKey, activeCharacterProfile);
    let output: Content[] = [];
    allPosts.forEach(post => {
      if (!output.includes(post) && (post.author === activeCharacterProfile)) {
        output.push(post);
      }
    });
    //output.forEach(o=>console.log(o.body));
    return output;
  }

  public getAllNonActiveUserPosts(storyKey: string, activeCharacterProfile: string): Content[] {
    const allPosts: Content[] = this.getPosts(storyKey, activeCharacterProfile);
    let output: Content[] = [];
    allPosts.forEach(post => {
      if (!output.includes(post) && (post.author !== activeCharacterProfile)) {
        output.push(post);
      }
    });
    //output.forEach(o=>console.log(o.body));
    return output;
  }

  // Assigns a random index in the range of two original indices
  // While preserving the original index positions for further reference
  // 1 (start)... R1, R2, R3, ...2 (end)
  // TODO: Add to storyContent.json or create new class?
  public assignRandomIndicesInRange(startIndex: number, endIndex: number) {

  }

  public sortPostRelationMapping(userPosts: Content[], nonUserPosts: Content[]): Content[] {
    // Sort
    userPosts.sort((a,b) => {
      return parseInt(a.storyMilestone) - parseInt(b.storyMilestone);
    });

    nonUserPosts.sort((a,b) => {
      return parseInt(a.storyMilestone) - parseInt(b.storyMilestone);
    });
    console.log("User posts sorted: ");
    userPosts.forEach(post => console.log(post.body));

    console.log("Non-User posts sorted: ");
    nonUserPosts.forEach(post => console.log(post.body));

    // traverse user posts
    // stop when post's story milestone is > TO APPEND 's 

    // CHAPTER 1
    // User posts (relevant to user story):
    // 1-2-3-4-5-6
    // 
    // Non user posts (relevant to user story):
    // A B C D E F

    // A    B
    //1 2  1 2

    // 1-A-B-2-3-4-5-6
    // 1-B-A-2-3-4-5-6

    // C
    //1 3

    // 1-B-A-2-C-3-4-5-6 <- if allow full range
    // 1-B-A-C-2-3-4-5-6 <- if only allow append after lower bound

    let clonedUserPosts: Content[] = this.deepCloneContentArray(userPosts);
    let clonedNonUserPosts: Content[] = this.deepCloneContentArray(nonUserPosts);

    clonedUserPosts.forEach((userPost) => {

      clonedNonUserPosts.forEach((nonUserPost) => {
        // nonUserPost = C
        // nonUserPost.previous = 1 
        // userPost.storyMilestone = 1

        if (parseInt(userPost.storyMilestone) <= parseInt(nonUserPost.previous) && parseInt(nonUserPost.next) >= parseInt(userPost.storyMilestone)) {
          // ok
          let tmp = userPost.next;
          console.log("tmp: " + tmp);
          userPost.next = nonUserPost.sKey;
          console.log("userPost.next: " + userPost.next);
          nonUserPost.previous = userPost.sKey;
          console.log("nonUserPost.previous: " + nonUserPost.previous);
          nonUserPost.next = tmp;
          console.log("nonUserPost.next: " + nonUserPost.next);          
        }
      });
    });

    console.log("Final posts sorted: ");
    //clonedUserPosts.forEach(post => console.log(post.body));

    let it: Content | undefined = clonedUserPosts[0];
    const hashMap: Map<string, Content> = this.buildPostHashMapUsingContent(clonedUserPosts);

    // while(it?.next !== "") {
    //   if (it) {
    //     console.log(hashMap.get(it.next)?.body);
    //     it = hashMap.get(it.next);
    //   }
    // }

    return clonedUserPosts;
  }

  private deepCloneContentArray(elements: Content[]): Content[] {
    return JSON.parse(JSON.stringify(elements));
  }
}
