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

    const [searchTerm, setSearchTerm] = useState<string | undefined>(props.searchTerm);

    const [forceExpand, setForceExpand] = useState<boolean>();

    const [showDetails, setShowDetails] = useState<boolean>(false);

    useEffect(() => {
        setSearchTerm(props.searchTerm);
    }, [props.searchTerm]);

    useEffect(() => {
        if (!searchTerm) {
            setTreeData(props.data);
            setShowDetails(false);
        } else {
            const [match, data] = filterTree(props.data, searchTerm);
            if (!match) {
                console.log("Nothing matched!!");
            }
            setTreeData(data);
        }
    }, [props.data, searchTerm]);

    const toggleShowDetails = () => {
        setShowDetails((d) => !d);
    };

    return (
        <div style={{zIndex: 3000}}>
            <div style={{
                maxWidth: 400,
                width: 400,
                maxHeight: 700,
                overflow: "scroll",
                borderStyle: "solid",
                borderWidth: "thin",
            }}>
                <div style={{float: "left", overflow: "auto", padding: 10}}>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="Search..."
                        // fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.currentTarget.value)}
                    />
                    {!searchTerm && (
                        <Button
                            variant="outlined"
                            onClick={() => setForceExpand((f) => !f)}
                        >
                            {forceExpand ? <Minus/> : <Plus/>}
                        </Button>
                    )}
                </div>
                <br/>
                <br/>
                <br/>
                {searchTerm && treeData.length > 0 && (
                    <div style={{textAlign: "left", fontSize: "smaller", verticalAlign: "middle"}}>
                        {showDetails ? <ToggleRight onClick={toggleShowDetails}/> :
                            <ToggleLeft onClick={toggleShowDetails}/>}
                        <div style={{ position: "relative", bottom: 20, left: 30}}>
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
                                          forceExpand={forceExpand || !!searchTerm}
                                          showDetails={showDetails}
                                />)) : <div>No match!</div>
                    }
                </div>
            </div>
        </div>
    );
};
