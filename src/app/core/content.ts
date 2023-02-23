import { Part } from "./part";
import { Share } from "./share";

export class LinkedList {
    constructor(private head: LinkedListNode | null, private contentHashMap: Map<string, LinkedListNode>) {}

    public size(): number {
        if (this.head == undefined) {
            return -1;
        }
        let count: number = 0;
        let it = this.head;
        while(it.next) {
            ++count;
            let next = this.contentHashMap.get(it.next);
            if (next) {
                it = next;
            }
        }
        return count;
    }

    public clear(): void {
        this.head = null;
    }

    public getFirst(): LinkedListNode | null {
        return this.head;
    }

    public getLast(): LinkedListNode | null {
        let lastNode = this.head;
        if (lastNode != null) {
            while (lastNode.next) {
                let next = this.contentHashMap.get(lastNode.next);
                if (next) {
                    lastNode = next;
                }
            }
        }
        return lastNode
    }

    public getAtIndex(index: number): LinkedListNode | null {
        if (this.head == undefined) {
            return null;
        }    
        let count = -1;
        let it = this.head;
        while(count < index && it.next) {
            ++count;
            let next = this.contentHashMap.get(it.next);
            if (next) {
                it = next;
            }
        }
        return it;
    }

    public insertAtIndex(newKey: string, index: string) {
        let atIndex: LinkedListNode | null = this.getAtIndex(parseInt(index));
        if (atIndex) {
            let oldNext: string = atIndex?.next;
            atIndex.next = newKey;
            //this.contentHashMap.set(index, )
        }
    }

    public removeAtIndex() {

    }
}

export class LinkedListNode {
    sKey: string = ""; // this is the data
    previous: string = "";
    next: string = "";
}

export class Content extends LinkedListNode {
    author: string = "";
    date: string = "";
    comments: Content[] = []; // Recursive...
    shares: Share[] = [];
    body: string = "";
    parts: Part[] = [];
    threejsSceneKey: string = "";
}

export class StoryContent extends LinkedListNode {
    name: string = "";
    characters: StoryCharacter[] = [];
}

export class StoryCharacter {
    name: string = "";
    posts: Content[] = [];
}