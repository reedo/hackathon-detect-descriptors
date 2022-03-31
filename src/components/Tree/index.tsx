import React, {useEffect, useState} from 'react'
import {TreeNode} from "./TreeNode";
import {ITreeNode} from "./models";
import SearchTerm from "./SearchTerm";

interface IProps {
    data: ITreeNode[];
}

function filterTree(tree: ITreeNode[], searchTerm: string): [boolean, ITreeNode[]] {

    let include = false;

    const resultTree: ITreeNode[] = [];

    for (const node of tree) {
        const [anyChildrenMatch, updatedChildren] = filterTree(node.children ?? [], searchTerm);

        const search = new SearchTerm(searchTerm);

        const matchedOns = search.matches(node);

        if (matchedOns.length > 0 || anyChildrenMatch) {
            resultTree.push({
                label: node.label,
                tags: [...node.tags],
                children: updatedChildren,
                matchedOn: matchedOns
            });
            include = true;
        }
    }
    return [include, resultTree];
}

export const Tree = (props: IProps) => {

    const [treeData, setTreeData] = useState<ITreeNode[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>();

    const [forceExpand, setForceExpand] = useState<boolean>();

    useEffect(() => {
        if (!searchTerm) {
            setTreeData(props.data);
        } else {
            const [match, data] = filterTree(props.data, searchTerm);
            if (!match) {
                console.log("Nothing matched!!");
            }
            setTreeData(data);
        }
    }, [props.data, searchTerm]);

    return (
        <div style={{position: "fixed", zIndex: 3000}}>
            <div style={{position: "fixed", right: 200, top: 100, maxWidth: 300, width: 300, overflow: "hidden"}}>
                <div style={{float: "left", overflow: "auto"}}>
                    <input width={100} type="text" className="form-control" value={searchTerm}
                           onChange={e => setSearchTerm(e.currentTarget.value)}/>

                    {!searchTerm && <button onClick={() => setForceExpand(f => !f)}>
                        {
                            forceExpand ? "Collapse all" : "Expand all"
                        }

                    </button>}
                </div>
                <br/>
                <br/>
                {
                    treeData.length > 0 ?
                        treeData.map((d: ITreeNode) => (
                            <TreeNode depth={0} data={d} forceExpand={forceExpand || !!searchTerm}/>)) :
                        <div>No match!</div>
                }
            </div>
        </div>
    );
};