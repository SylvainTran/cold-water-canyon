import { Part } from "./part";
import { Share } from "./share";

/**
 * Basically walks through
 * the hashmap using the
 * the hashmap's previous and next
 * property keys.
 * 
 * There is also the concept of ranking.
 */
export class LinkedList {
    private head: LinkedListNode | undefined;
    
    constructor(private contentHashMap: Map<string, LinkedListNode>) {
        // The head of the linked list is posts[0] or post with sKey == "A"
        this.head = contentHashMap.get("A");
    }

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
        this.head = undefined;
    }

    public getFirst(): LinkedListNode | undefined {
        return this.head;
    }

    public getLast(): LinkedListNode | undefined {
        let lastNode = this.head;
        if (lastNode != null) {
            while (lastNode.next) {
                let next = this.contentHashMap.get(lastNode.next);
                if (next) {
                    lastNode = next;
                }
            }
        }
        return lastNode;
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

    public getAtSKey(sKey: string): LinkedListNode | null {
        if (this.head == undefined) {
            return null;
        }
        let it = this.head;
        while(it.next) {

            if (it.sKey == sKey) {
                return it;
            }
            else {
                let next = this.contentHashMap.get(it.next);
                if (next) {
                    it = next;
                }
            }
        }
        return null;
    }

    /**
     * Insertion algorithm
     * using hashkeys instead of indexes
     * 
     * TODO: used owners of ranks system instead
     */
    public insertAtLeftSKey(postToInsertSKey: string, leftSKey: string, rightSKey: string) {
        // This is in the linked list
        let postAtLeft: LinkedListNode | null = this.getAtSKey(leftSKey);
        let postToInsert: LinkedListNode | undefined = this.contentHashMap.get(postToInsertSKey);

        if (postAtLeft && postToInsert) {
            let oldPostAtLeftNext = postAtLeft.next; // B
            postAtLeft.next = postToInsertSKey; // C
            postToInsert.next = oldPostAtLeftNext; // B - implicit, already in the json, but may change again here due to shuffling algorithm
            // expect A C B
        } else {
            console.error("Post at left or post to insert missing");
        }
        // TODO: walk in the linked list until reach rightSKey and randomize non user posts in between?
    }

    public removeAtKey() {
    }
}

export class LinkedListNode {
    sKey: string = ""; // this is the data
    rank: string = "";
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
    relations?: StoryCharacter[] = [];
}