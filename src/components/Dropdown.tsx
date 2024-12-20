import React, { useState, useEffect, useRef } from "react";
import { DropdownItem } from "./SearchBar";

interface DropdownProps<ItemType> {
  items: DropdownItem<ItemType>[];
  onItemSelect: (item: DropdownItem<ItemType>) => void;
  listRef: React.RefObject<HTMLUListElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Dropdown<ItemType = any>({
  items,
  onItemSelect,
  listRef,
}: DropdownProps<ItemType>): JSX.Element {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.key === "ArrowDown") {
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === items.length - 1
          ? 0
          : prevIndex + 1,
      );
    } else if (event.key === "ArrowUp") {
      setFocusedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? items.length - 1
          : prevIndex - 1,
      );
    } else if (event.key === "Enter" && focusedIndex !== null) {
      onItemSelect(items[focusedIndex]);
    }
  };

  useEffect(() => {
    if (focusedIndex !== null && listRef.current) {
      const listItem = listRef.current.children[focusedIndex] as HTMLElement;
      listItem.focus();
    }
  }, [focusedIndex]);

  return (
    <div
      className={`top-30 absolute z-30 flex max-h-[300px] w-full cursor-pointer flex-col overflow-auto rounded-lg bg-slate-100 shadow-lg`}
    >
      <ul
        ref={listRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="listbox"
        aria-activedescendant={
          focusedIndex !== null ? `dropdown-item-${focusedIndex}` : undefined
        }
      >
        {items.map((item, index) => (
          <li
            key={item.value}
            id={`dropdown-item-${index}`}
            className={`px-4 py-2 hover:bg-zinc-300 ${
              focusedIndex === index ? "bg-zinc-300" : ""
            }`}
            onClick={() => onItemSelect(item)}
            tabIndex={-1}
            role="option"
            aria-selected={focusedIndex === index}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
