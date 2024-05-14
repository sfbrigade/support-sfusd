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
        className={`top-30 absolute z-30 flex max-h-[300px] w-full cursor-pointer flex-col overflow-auto rounded-lg bg-slate-100 shadow-lg`}
      >
        <ul>
          {items.map((item) => (
            <li
              key={item.value}
              className="px-4 py-2 hover:bg-zinc-300"
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
