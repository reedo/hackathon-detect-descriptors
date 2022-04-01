import React, {useCallback, useMemo, useState} from 'react'
import {ITreeNode} from "./models";
import Collapsible from 'react-collapsible';
import {ChevronDown, ChevronUp} from "react-feather";

interface IProps {
    data: ITreeNode;
    depth: number;
    forceExpand: boolean;
    showDetails: boolean;
}

export const TreeNode = (props: IProps) => {

    const [open, setOpen] = useState<boolean>(false);

    const matchedOn = useMemo((): React.ReactElement | undefined => {
        if (props.data.matchedOn && props.data.matchedOn.length > 0) {
            return (
                <ul>
                    {
                        props.data.matchedOn.map((mo, index: number) => {
                            return (
                                <li key={index}>
                                    {mo.fullOrPartial} match on <span
                                    style={{color: "green"}}>{mo.type}</span> '<span
                                    style={{color: "purple"}}>{mo.matched}</span>' = '<span
                                    style={{color: "red"}}>{mo.value}</span>'
                                </li>
                            );
                        })
                    }
                </ul>
            );
        }
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

    const fontSize = useMemo(() => Math.max(5, 20 - (props.depth * 2)), [props.depth]);

    const label = useMemo((): React.ReactElement => {
        return (
            <div style={{fontSize: fontSize}}>
                {props.data.label}
                {chevron()}
            </div>
        )
    }, [props.data, open, hasChildren, fontSize]);

    return (
        <div style={{textAlign: "left"}}>

            <Collapsible trigger={label}
                         open={props.forceExpand}
                         onOpen={() => setOpen(true)}
                         onClose={() => setOpen(false)}>
                {props.showDetails && <div style={{fontSize: fontSize}}>{matchedOn ?? ""}</div>}
                {
                    props.data.children?.map((c, index: number) => (
                        <div key={index} style={{marginLeft: props.depth * 15}}>
                            <TreeNode key={index}
                                      depth={props.depth + 1}
                                      data={c}
                                      forceExpand={props.forceExpand}
                                      showDetails={props.showDetails}
                            />
                        </div>
                    ))
                }
            </Collapsible>
        </div>
    );
};
