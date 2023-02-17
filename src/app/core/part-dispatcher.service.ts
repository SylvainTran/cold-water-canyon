import { Injectable } from '@angular/core';

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

  public sortPostRelationMapping(userPosts: Content[], nonUserPosts: Content[]): void {
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
  }
}
