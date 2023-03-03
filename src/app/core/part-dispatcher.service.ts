import { Injectable } from '@angular/core';

// Data
import storyData from '../data/storyContent.json';
import { Content, LinkedList, StoryCharacter, StoryContent } from './content';

@Injectable({
  providedIn: 'root'
})
export class PartDispatcherService {

  public postDatabase: Map<string, Content>;

  constructor() {
    this.postDatabase = new Map<string, Content>;
  }

  public getStories(): StoryContent[] {
    return storyData.properties.content.stories;
  }

  public getActiveStoryName(sKey: string): string {
    let storyName = "";
    this.getStories().forEach(story => {
      if (story.sKey === sKey) {
        storyName = story.name;
      }
    });
    return storyName;
  }

  public getCharacters(storyKey: String): StoryCharacter[] {
    let characters: StoryCharacter[] = [];
    this.getStories().forEach(story => {
      if (story.sKey === storyKey) {
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

  public getRelationPosts(storyKey: String, characterName: String): StoryCharacter[] | undefined {
    let relationPosts: StoryCharacter[] | undefined = [];
    this.getCharacters(storyKey).forEach(character => {
      if (character.name === characterName) {
        relationPosts = character.relations;
      }
    });
    return relationPosts;
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

  public getRelationPostsContent(storyKey: string, activeCharacterProfile: string): Content[] {
    const relationPosts: StoryCharacter[] | undefined = this.getRelationPosts(storyKey, activeCharacterProfile);
    let output: Content[] = [];

    relationPosts?.forEach(character => {
      character.posts.forEach(post => {
        if (!output.includes(post)) {
          output.push(post);
        }
      });
    });
    output.forEach(o=>{
      console.log(o.sKey);
      console.log(o.body);
    });
    return output;
  }

  // Assigns a random index in the range of two original indices
  // While preserving the original index positions for further reference
  // 1 (start)... R1, R2, R3, ...2 (end)
  // TODO: Add to storyContent.json or create new class?
  public assignRandomIndicesInRange(startIndex: number, endIndex: number) {

  }

  // TODO: need fixed ranks
  // It means, insert me somewhere after my 'prev' and somewhere before the 'next'
  // The posts owning the ranks change, but the prev and next refer to the ranks - get me the current owner of that rank.
  public testLinkedList() {
    let posts: Content[] = this.getPosts("f4", "Onager");
    let relationPosts: StoryCharacter[] | undefined = this.getRelationPosts("f4", "Onager");
    let hashMap = this.buildPostHashMapUsingContent(posts);
    let list: LinkedList = new LinkedList(hashMap);
    // Insert all the story posts
    this.getRelationPostsContent("f4", "Onager").forEach((post) => {
      //list.insertAtPreviousSKey(post.sKey, post.previous, post.next);
    });
    console.log("List size test: " + list.size());
  }

  public arrangePosts(storyKey: string, activeCharacterProfile: string): Content[] {
    let allPosts: Content[] = [...this.getPosts(storyKey, activeCharacterProfile), ...this.getRelationPostsContent(storyKey, activeCharacterProfile)];    

    allPosts.sort((postA, postB) => parseInt(postA.rank) - parseInt(postB.rank));
    return allPosts;
  }

  private deepCloneContentArray(elements: Content[]): Content[] {
    return JSON.parse(JSON.stringify(elements));
  }
}
