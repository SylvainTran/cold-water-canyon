import { Part } from "./part";
import { Share } from "./share";

export class LinkedListNode {
    previous: string = "";
    next: string = "";
}

export class Content extends LinkedListNode {
    sKey: string = "";
    author: string = "";
    date: string = "";
    comments: Content[] = []; // Recursive...
    shares: Share[] = [];
    body: string = "";
    parts: Part[] = [];
    threejsSceneKey: string = "";
    storyMilestone: string = ""; // if -1, then is a random post
}

export class StoryContent extends LinkedListNode {
    name: string = "";
    characters: StoryCharacter[] = [];
}

export class StoryCharacter {
    name: string = "";
    posts: Content[] = [];
}