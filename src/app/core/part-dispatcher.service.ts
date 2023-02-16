import { Injectable } from '@angular/core';
import { DataPart, Part } from './part';
// Data
import storyData from '../data/storyContent.json';
import { Content, StoryCharacter } from './content';

@Injectable({
  providedIn: 'root'
})
export class PartDispatcherService {

  public getStories() {
    return storyData.properties.content.stories;
  }

  public getCharacters(storyKey: String) {
    let characters: StoryCharacter[] = [];
    this.getStories().forEach(story => {
      if (story.name === storyKey) {
        characters = story.characters;
      }
    });
    return characters;
  }

  public getPosts(storyKey: String, characterName: String) {
    let posts: Content[] = [];
    console.log("Searching posts : " + characterName);

    this.getCharacters(storyKey).forEach(character => {
      console.log("Searching posts : " + character.name);

      if (character.name === characterName) {
        posts = character.posts;
      }
    });
    return posts;
  }
}
