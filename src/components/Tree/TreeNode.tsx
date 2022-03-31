import React, {useCallback, useMemo, useState} from 'react'
import {ITreeNode} from "./models";
import Collapsible from 'react-collapsible';
import {ChevronDown, ChevronUp} from "react-feather";

interface IProps {
    data: ITreeNode;
    depth: number;
    forceExpand: boolean;
}

export const TreeNode = (props: IProps) => {

    const indent = useMemo(() => "-".repeat(props.depth), [props.depth]);

    const [open, setOpen] = useState<boolean>(false);

    const matchedOn = useMemo(() => {
        if (!props.data.matchedOn || props.data.matchedOn.length === 0) {
            return undefined;
        }
        const lines = props.data.matchedOn.map((mo) => `${mo.fullOrPartial} match on ${mo.type} '${mo.matched}' = '${mo.value}'`);

        return `(${lines?.join(", ")})`;

    }, [props.data]);

    const hasChildren = useMemo(() => {
        if (!props.data.children) {
            return false;
        }
        return props.data.children.length > 0;
    }, [props.data]);

    const chevron = useCallback((): React.ReactElement | undefined => {
        if (hasChildren) {
            return open ? <ChevronUp/> : <ChevronDown/>;
        }
    }, [hasChildren, open]);

    const label = useMemo((): React.ReactElement => {
        return (
            <div>
                {indent}{props.data.label}

                {chevron()}
            </div>
        )
    }, [indent, props.data, open, hasChildren]);

    return (
        <div style={{ textAlign: "left"}}>

            <Collapsible trigger={label}
                         open={props.forceExpand}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}>
                <div style={{fontSize: 15}}>{matchedOn ?? ""}</div>
                {
                    props.data.children?.map((c, index: number) => (
                        <div key={index}>
                            <TreeNode key={index} depth={props.depth + 1} data={c} forceExpand={props.forceExpand}/>
                        </div>
                    ))
                }
            </Collapsible>
        </div>


    );
};
