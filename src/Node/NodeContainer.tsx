import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { NodeData } from "../utils/types";
import { NodeTyperSwitcher } from "./NodeTyperSwitcher";
import styles from "./NodeContainer.module.css";

type NodeContainerProps = {
  node: NodeData;
  updateFocusIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

export const NodeContainer = ({
  index,
  isFocused,
  node,
  updateFocusIndex,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: node.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
    ref={setNodeRef} 
    {...attributes}
    style={style}
    className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTyperSwitcher 
        node={node}
        updateFocusIndex={updateFocusIndex}
        index={index}
        isFocused={isFocused}
      />
    </div>
  );
};
