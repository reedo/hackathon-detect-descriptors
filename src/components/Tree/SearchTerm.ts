import {ITreeNode} from "./models";

type MatchType = "label" | "tag";

function isMatch(matchType: MatchType, text: string, term: string): IMatchedOn | undefined {
    if (text === term) {
        return {
            type: matchType,
            fullOrPartial: "full",
            matched: term,
            value: text
        }
    }
    if (text.includes(term)) {
        return {
            type: matchType,
            fullOrPartial: "partial",
            matched: text,
            value: term
        }
    }
}

export interface IMatchedOn {
    type: MatchType;
    fullOrPartial: "full" | "partial";
    matched: string;
    value: string;
}

export default class SearchTerm {

    constructor(private readonly term: string, private matchedOn: IMatchedOn[] = []) {
    }

    public matches(treeNode: ITreeNode): IMatchedOn[] {

        const isMatchedOnLabel = isMatch("label", treeNode.label, this.term);

        if (isMatchedOnLabel) {
            this.matchedOn.push(isMatchedOnLabel);
        }

        treeNode.tags.map((tag) => isMatch("tag", tag, this.term))
            .forEach((isMatchedOnTag) => {
                if (isMatchedOnTag) {
                    this.matchedOn.push(isMatchedOnTag);
                }
            });

        return this.matchedOn;
    }
}