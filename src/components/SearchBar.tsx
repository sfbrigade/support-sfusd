import React, { useState } from "react";
import Image from "next/image";

import Dropdown from "./Dropdown";
import type { DropdownItem } from "@/types/school";

interface SearchBarProps<DropdownItemType> {
  onItemSelect: (item: DropdownItem<DropdownItemType>) => void;
  onSearch: (searchTerm: string) => Promise<DropdownItem<DropdownItemType>[]>;
  onSearchSubmit?: (searchTerm: string) => void;
}

export default function SearchBar<DropdownItemType = unknown>({
  onItemSelect,
  onSearch,
  onSearchSubmit,
}: SearchBarProps<DropdownItemType>): React.JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownItems, setDropdownItems] = useState<
    DropdownItem<DropdownItemType>[]
  >([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);
    const searchResults = await onSearch(userInput);
    setDropdownItems(searchResults);
    setShowNoResults(userInput.trim().length > 0 && searchResults.length === 0);
    setCursor(-1);
  };

  const handleItemSelect = (item: DropdownItem<DropdownItemType>) => {
    setSearchTerm(item.label);
    onItemSelect(item);
    setDropdownItems([]);
    setShowNoResults(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      if (dropdownItems.length === 0) {
        return;
      }
      e.preventDefault();
      setCursor((prev) => (prev < dropdownItems.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      if (dropdownItems.length === 0) {
        return;
      }
      e.preventDefault();
      setCursor((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && cursor >= 0) {
      e.preventDefault();
      handleItemSelect(dropdownItems[cursor]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onSearchSubmit?.(searchTerm);
      setDropdownItems([]);
      setShowNoResults(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <Image
          src="/icons/search-icon.svg"
          alt="Search Icon"
          width={24}
          height={24}
          className="opacity-60"
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        data-search-input
        placeholder="Search Zip Code or School"
        value={searchTerm}
        className="placeholder-small p-1.4 h-[38px] w-full rounded-lg border-[1.4px] border-gray-400 px-4 py-2 pl-12 focus:border-blue-400"
        onChange={onInputChange}
        onFocus={() => {
          if (searchTerm.length > 0) {
            // Re-trigger search to show dropdown
            onSearch(searchTerm).then((searchResults) => {
              setDropdownItems(searchResults);
              setShowNoResults(searchResults.length === 0);
            });
          }
        }}
        onBlur={() => {
          // Hide dropdown when input loses focus
          setDropdownItems([]);
          setShowNoResults(false);
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
      {showNoResults && (
        <div className="top-30 absolute z-30 flex max-h-[300px] w-full flex-col overflow-auto rounded-lg bg-slate-100 shadow-lg">
          <div className="px-4 py-2 text-gray-500">No results found</div>
        </div>
      )}
    </div>
  );
}
