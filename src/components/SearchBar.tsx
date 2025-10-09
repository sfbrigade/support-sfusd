import React, { useState } from "react";

import Dropdown from "./Dropdown";
import type { DropdownItem } from "@/types/school";
import SearchIcon from "../../public/icons/search-icon.svg";

interface SearchBarProps<DropdownItemType> {
  onItemSelect: (item: DropdownItem<DropdownItemType>) => void;
  onSearch: (searchTerm: string) => Promise<DropdownItem<DropdownItemType>[]>;
}

export default function SearchBar<DropdownItemType = any>({
  onItemSelect,
  onSearch,
}: SearchBarProps<DropdownItemType>): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownItems, setDropdownItems] = useState<
    DropdownItem<DropdownItemType>[]
  >([]);
  const [cursor, setCursor] = useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);
    const searchResults = await onSearch(userInput);
    setDropdownItems(searchResults);
    setCursor(-1);
  };

  const handleItemSelect = (item: DropdownItem<DropdownItemType>) => {
    setSearchTerm(item.label);
    onItemSelect(item);
    setDropdownItems([]);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Does not handle keys if dropdown is empty
    if (dropdownItems.length === 0) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((prev) => (prev < dropdownItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && cursor >= 0) {
      e.preventDefault();
      handleItemSelect(dropdownItems[cursor]);
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <SearchIcon className="fill-[#949494]" height="24" width="24" />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Zip Code or School"
        value={searchTerm}
        className="placeholder-small p-1.4 h-[38px] w-full rounded-lg border-[1.4px] border-gray-400 px-4 py-2 pl-12 focus:border-blue-400"
        onChange={onInputChange}
        onFocus={() => {
          if (searchTerm.length > 0) {
            // Re-trigger search to show dropdown
            onSearch(searchTerm).then(setDropdownItems);
          }
        }}
        onBlur={() => {
          // Hide dropdown when input loses focus
          setDropdownItems([]);
          setCursor(-1);
        }}
        onKeyDown={handleKeyDown}
      />
      {dropdownItems.length > 0 && (
        <Dropdown
          items={dropdownItems}
          onItemSelect={handleItemSelect}
          cursor={cursor}
        />
      )}
    </div>
  );
}
