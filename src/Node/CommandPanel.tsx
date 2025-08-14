import { useEffect, useState } from "react";
import type { NodeType } from "../utils/types";
import { useOverflowsScreenBottom } from "./useOverflowsScreenBottom";
import styles from "./CommandPanel.module.css";
import cx from "classnames";

type CommandPanelProps = {
  nodeText: string;
  selectItem: (item: NodeType) => void;
};

type SupportedNodeType = {
  value: NodeType;
  name: string;
};

const supportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "page", name: "Page" },
  { value: "image", name: "Image" },
  { value: "heading1", name: "Heading 1" },
  { value: "heading2", name: "Heading 2" },
  { value: "heading3", name: "Heading 3" },
];

export const CommandPanel = ({ nodeText, selectItem }: CommandPanelProps) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overflows, ref } = useOverflowsScreenBottom();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedItemIndex((prev) =>
          Math.min(prev + 1, supportedNodeTypes.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedItemIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectItem, selectedItemIndex]);

  useEffect(() => {
    const normalizedValue = nodeText.toLowerCase().replace(/\//, "");
    setSelectedItemIndex(
      supportedNodeTypes.findIndex((item) =>
        item.value.toLowerCase().match(normalizedValue)
      )
    );
  }, [nodeText]);

  return (
    <div
      className={cx(styles.panel, {
        [styles.reverse]: overflows,
      })}
      ref={ref}
    >
      <div className={styles.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = index === selectedItemIndex;

          return (
            <li
              key={type.value}
              className={cx({
                [styles.selected]: selected,
              })}
              onClick={() => selectItem(type.value)}
            >
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
