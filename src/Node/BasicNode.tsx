import { useEffect, useRef } from "react";
import type { NodeData, NodeType } from "../utils/types";
import styles from "./Node.module.css";
import { useAppState } from "../state/AppStateContext";
import { CommandPanel } from "./CommandPanel";
import cx from "classnames";

type BasicNodeProps = {
  node: NodeData;
  updateFocusIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

export const BasicNode = ({
  node,
  updateFocusIndex,
  index,
  isFocused,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { addNode, changeNodeValue, changeNodeType, removeNode } =
    useAppState();

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const value = e.currentTarget.textContent || "";
    changeNodeValue(index, value);
  };

  const handleClick = () => {
    updateFocusIndex(index);
  };

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (e.key === "Enter") {
      e.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      addNode(
        {
          value: "",
          type: node.type,
          id: crypto.randomUUID(),
        },
        index + 1
      );
      updateFocusIndex(index + 1);
    }
    if (e.key === "Backspace") {
      if (target.textContent?.length === 0) {
        e.preventDefault();
        removeNode(index);
        updateFocusIndex(index - 1);
      } else if (window.getSelection()?.anchorOffset === 0) {
        e.preventDefault();
        removeNode(index - 1);
        updateFocusIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel nodeText={node.value} selectItem={parseCommand} />
      )}
      <div
        onInput={handleInput}
        onClick={handleClick}
        onKeyDown={onKeyDown}
        ref={nodeRef}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
