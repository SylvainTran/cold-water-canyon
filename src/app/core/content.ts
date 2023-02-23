import { Part } from "./part";
import { Share } from "./share";

/**
 * Basically walks through
 * the hashmap using the
 * the hashmap's previous and next
 * property keys.
 * 
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
     * Find the leftSKey and rightSKey in the hashmap
     * 
     */
    public insertAtPreviousSKey(postToInsertSKey: string, leftSKey: string, rightSKey: string) {
        let l_prev_post: LinkedListNode | undefined = this.contentHashMap.get(leftSKey);
        // let post_to_insert: LinkedListNode | undefined = this.relationHashMap.get(postToInsertSKey);

        // if (l_prev_post && post_to_insert) {
            
        //     // update post_to_insert's prev sKey to be the prev post's sKey
        //     let oldnextSKey = l_prev_post.next;

        //     // Update the prev post's next to be post_to_insert's sKey
        //     l_prev_post.next = post_to_insert.sKey;

        //     post_to_insert.next = oldnextSKey;            
        // }
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