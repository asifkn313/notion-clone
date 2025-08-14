import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { NodeData } from "../utils/types";

type useFocusedNodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusedNodeIndex = ({
  nodes,
}: useFocusedNodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedNodeIndex((prevIndex) =>
          Math.min(prevIndex + 1, nodes.length - 1)
        );
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedNodeIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
