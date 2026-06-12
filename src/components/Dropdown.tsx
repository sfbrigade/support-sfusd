import React, { useEffect, useRef } from "react";
import type { DropdownItem } from "@/types/school";

interface DropdownProps<ItemType> {
  items: DropdownItem<ItemType>[];
  onItemSelect: (item: DropdownItem<ItemType>) => void;
  cursor: number;
  emptyMessage?: string;
}

export default function Dropdown<ItemType = unknown>({
  items,
  onItemSelect,
  cursor,
  emptyMessage,
}: DropdownProps<ItemType>): React.JSX.Element {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (cursor >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[cursor] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [cursor]);

  return (
    <>
      <div
        className={`top-30 absolute z-30 flex max-h-[300px] w-full cursor-pointer flex-col overflow-auto rounded-lg bg-slate-100 shadow-lg`}
      >
        <ul ref={listRef}>
          {items.length === 0 && emptyMessage && (
            <li className="px-4 py-2 text-gray-500">{emptyMessage}</li>
          )}
          {items.map((item, index) => (
            <li
              key={item.value}
              tabIndex={0}
              className={`px-4 py-2 hover:bg-zinc-300 ${cursor === index ? "bg-zinc-300" : ""}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onItemSelect(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
