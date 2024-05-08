import React, { useState } from "react";
import { DropdownItem } from "./SearchBar";

interface DropdownProps<ItemType> {
  items: DropdownItem<ItemType>[];
  onItemSelect: (item: DropdownItem<ItemType>) => void;
}

export default function Dropdown<ItemType = any>({
  items,
  onItemSelect,
}: DropdownProps<ItemType>): JSX.Element {
  return (
    <>
      <div
        className={`absolute top-8 z-30 flex min-h-[300px] w-[250px] flex-col rounded-md bg-zinc-400 py-4`}
      >
        <ul>
          {items.map((item) => (
            <li
              key={item.value}
              className="px-4 py-1 hover:bg-zinc-300 hover:text-zinc-500"
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
