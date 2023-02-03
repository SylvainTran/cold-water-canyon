import { Content } from "./content";

export class Part {
    content: Content | undefined; // if undefined, will show loading spinner
    public setContent(content: Content) {
        this.content = content;
    }
}

export class DataPart extends Part {

}

export class ReferencePart extends Part {

}