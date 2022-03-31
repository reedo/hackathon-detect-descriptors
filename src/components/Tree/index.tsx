import { useEffect, useState } from 'react';
import { TreeNode } from './TreeNode';
import { ITreeNode } from './models';
import SearchTerm from './SearchTerm';
import { TextField, Button } from '@mui/material';

interface IProps {
  data: ITreeNode[];
  searchTerm?: string;
}

function filterTree(
  tree: ITreeNode[],
  searchTerm: string
): [boolean, ITreeNode[]] {
  let include = false;

  const resultTree: ITreeNode[] = [];

  for (const node of tree) {
    const [anyChildrenMatch, updatedChildren] = filterTree(
      node.children ?? [],
      searchTerm
    );

    const processedSearchTerm = searchTerm.includes(',')
      ? searchTerm.split(',')
      : searchTerm;

    const search = new SearchTerm(processedSearchTerm);

    const matchedOns = search.matches(node);

    if (matchedOns.length > 0 || anyChildrenMatch) {
      resultTree.push({
        label: node.label,
        tags: [...node.tags],
        children: updatedChildren,
        matchedOn: matchedOns,
      });
      include = true;
    }
  }
  return [include, resultTree];
}

export const Tree = (props: IProps) => {
  const [treeData, setTreeData] = useState<ITreeNode[]>([]);

  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    props.searchTerm
  );

  const [forceExpand, setForceExpand] = useState<boolean>();

  useEffect(() => {
    if (!searchTerm) {
      setTreeData(props.data);
    } else {
      const [match, data] = filterTree(props.data, searchTerm);
      if (!match) {
        console.log('Nothing matched!!');
      }
      setTreeData(data);
    }
  }, [props.data, searchTerm]);

  return (
    <div style={{ position: 'fixed', zIndex: 3000 }}>
      <div
        style={{
          position: 'fixed',
          right: 200,
          top: 100,
          maxWidth: 300,
          width: 300,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            float: 'left',
            overflow: 'auto',
            flexDirection: 'row',
          }}
        >
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
              {forceExpand ? 'Collapse all' : 'Expand all'}
            </Button>
          )}
        </div>
        <br />
        <br />
        {treeData.length > 0 ? (
          treeData.map((d: ITreeNode, index: number) => (
            <TreeNode
              key={index}
              depth={0}
              data={d}
              forceExpand={forceExpand || !!searchTerm}
            />
          ))
        ) : (
          <div>No match!</div>
        )}
      </div>
    </div>
  );
};
