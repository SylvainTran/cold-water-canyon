import { PComment } from "./pComment";
import { Part } from "./part";
import { Share } from "./share";

export class Content {
    sKey: string = "";
    author: string = "";
    date: string = "";
    comments: Content[] = []; // Recursive...
    shares: Share[] = [];
    body: string = "";
    parts: Part[] = [];
    threejsSceneKey: string = "";
}
