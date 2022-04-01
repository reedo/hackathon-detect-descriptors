import React, {useEffect, useState} from 'react'
import {TreeNode} from "./TreeNode";
import {ITreeNode} from "./models";
import SearchTerm from "./SearchTerm";
import {Button, TextField} from '@mui/material';
import {Minus, Plus, ToggleLeft, ToggleRight} from "react-feather";

interface IProps {
    data: ITreeNode[];
    searchTerm?: string;
}

function filterTree(tree: ITreeNode[], searchTerm: string): [boolean, ITreeNode[]] {

    let include = false;

    const resultTree: ITreeNode[] = [];

    for (const node of tree) {
        const [anyChildrenMatch, updatedChildren] = filterTree(node.children ?? [], searchTerm);

        const processedSearchTerm = searchTerm.includes(",") ? searchTerm.split(",") : searchTerm;

        const search = new SearchTerm(processedSearchTerm);

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

    const [forceExpand, setForceExpand] = useState<boolean>();

    const [showDetails, setShowDetails] = useState<boolean>(false);

    useEffect(() => {
        if (!props.searchTerm) {
            setTreeData(props.data);
            setShowDetails(false);
        } else {
            const [match, data] = filterTree(props.data, props.searchTerm);
            if (!match) {
                console.log("Nothing matched!!");
            }
            setTreeData(data);
        }
    }, [props.data, props.searchTerm]);

    const toggleShowDetails = () => {
        setShowDetails((d) => !d);
    };

    return (
        <div style={{zIndex: 3000}}>
            <div style={{
                maxWidth: 400,
                maxHeight: 700,
                overflow: "scroll",
                borderStyle: "solid",
                borderWidth: "thin",
            }}>
                <div style={{float: "left", overflow: "auto", padding: 10}}>
                        <Button
                            variant="outlined"
                            onClick={() => setForceExpand((f) => !f)}
                        >
                            {forceExpand ? <Minus/> : <Plus/>}
                        </Button>
                </div>
                <br/>
                <br/>
                <br/>
                {props.searchTerm && treeData.length > 0 && (
                    <div style={{textAlign: "left", fontSize: "smaller", verticalAlign: "middle"}}>
                        {showDetails ? <ToggleRight onClick={toggleShowDetails}/> :
                            <ToggleLeft onClick={toggleShowDetails}/>}
                        <div style={{position: "relative", bottom: 20, left: 30}}>
                            Show matches
                        </div>
                    </div>
                )}
                <div style={{padding: 10}}>
                    {
                        treeData.length > 0 ?
                            treeData.map((d: ITreeNode, index: number) => (
                                <TreeNode key={index}
                                          depth={1} data={d}
                                          forceExpand={forceExpand || !!props.searchTerm}
                                          showDetails={showDetails}
                                />)) : <div>No match!</div>
                    }
                </div>
            </div>
        </div>
    );
};
