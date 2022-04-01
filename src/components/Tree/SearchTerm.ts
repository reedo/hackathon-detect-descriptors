import {ITreeNode} from "./models";

type MatchType = "label" | "tag";

function isMatch(matchType: MatchType, text: string, term: string): IMatchedOn | undefined {
    const sanitisedText = text.trim().toLowerCase();
    const sanitisedTerm = term.trim().toLowerCase();

    if (sanitisedText === sanitisedTerm) {
        return {
            type: matchType,
            fullOrPartial: "full",
            matched: term,
            value: text
        }
    }
    if (sanitisedText.includes(" ")) {
        const partials: IMatchedOn[] = sanitisedText.split(" ")
            .map((t) => isMatch(matchType, t, term))
            .filter((x) => x)
            .map((x) => x!);

        if (partials.length > 0) {
            return {...partials[0], fullOrPartial: "partial"};
        }
    }
}

export interface IMatchedOn {
    type: MatchType;
    fullOrPartial: "full" | "partial";
    matched: string;
    value: string;
}

function getLabelMatches(treeNode: ITreeNode, term: string | string[]): IMatchedOn[] {
    if (typeof term === "string") {
        const isMatchedOnLabel = isMatch("label", treeNode.label, term);
        return isMatchedOnLabel ? [isMatchedOnLabel] : [];
    }
    return term.flatMap((t) => getLabelMatches(treeNode, t));
}

function getTagMatches(treeNode: ITreeNode, term: string | string[]): IMatchedOn[] {
    if (typeof term === "string") {
        return treeNode.tags.map((tag) => isMatch("tag", tag, term))
            .filter((x) => x)
            .map((x) => x!);
    }
    return term.flatMap((t) => getTagMatches(treeNode, t));
}

export default class SearchTerm {

    constructor(private readonly term: string | string[]) {
    }

    public matches(treeNode: ITreeNode): IMatchedOn[] {
        const matchedOn: IMatchedOn[] = [];

        matchedOn.push(...getLabelMatches(treeNode, this.term));
        matchedOn.push(...getTagMatches(treeNode, this.term));

        return matchedOn;
    }
}