import { PComment } from "./pComment";
import { Part } from "./part";
import { Share } from "./share";

export class Content {
    sKey: string = "";
    author: string = "Merlin";
    date: string = "";
    comments: PComment[] = [];
    shares: Share[] = [];
    body: string = "";
    parts: Part[] = [];
}
