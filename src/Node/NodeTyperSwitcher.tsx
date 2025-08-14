import type { NodeData, NodeType } from "../utils/types";
import { BasicNode } from "./BasicNode";
import { ImageNode } from "./imageNode";
import { PageNode } from "./PageNode";

type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFocusIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

const TEXT_NODE_TYPES: NodeType[] = [
  "text",
  "list",
  "heading1",
  "heading2",
  "heading3",
];

export const NodeTyperSwitcher = ({
  node,
  updateFocusIndex,
  index,
  isFocused,
}: NodeTypeSwitcherProps) => {
  if (TEXT_NODE_TYPES.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        updateFocusIndex={updateFocusIndex}
        index={index}
        isFocused={isFocused}
      />
    );
  }

  // if (node.type === "page") {
  //   return <PageNode index={index} isFocused={isFocused} node={node} />;
  // }

  // if (node.type === "image") {
  //   return <ImageNode index={index} isFocused={isFocused} node={node} />;
  // }
  return null;
};
