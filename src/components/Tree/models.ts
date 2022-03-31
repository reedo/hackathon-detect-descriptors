import {IMatchedOn} from "./SearchTerm";

export interface ITreeNode {
    label: string;
    tags: string[];
    children?: ITreeNode[];
    matchedOn?: IMatchedOn[];
}