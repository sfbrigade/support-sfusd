import React, { useState } from "react";
import Image from "next/image";

import Dropdown from "./Dropdown";
import type { DropdownItem } from "@/types/school";

interface SearchBarProps<DropdownItemType> {
  onItemSelect: (item: DropdownItem<DropdownItemType>) => void;
  onSearch: (searchTerm: string) => Promise<DropdownItem<DropdownItemType>[]>;
  onSearchSubmit?: (searchTerm: string) => void;
  onSearchClear?: () => void;
  showDropdown?: boolean;
  selectedZipcode?: string;
  setSelectedZipcode?: (zipcode: string) => void;
}

export default function SearchBar<DropdownItemType = unknown>({
  onItemSelect,
  onSearch,
  onSearchSubmit,
  onSearchClear,
  showDropdown = true,
  selectedZipcode,
  setSelectedZipcode,
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
    setSelectedZipcode?.(userInput);
    if (!userInput) {
      onSearchClear?.();
    }
    const searchResults = await onSearch(userInput);
    setDropdownItems(searchResults);
    setShowNoResults(userInput.trim().length > 0 && searchResults.length === 0);
    setCursor(-1);
  };

  const handleItemSelect = (item: DropdownItem<DropdownItemType>) => {
    setSearchTerm(item.label);
    setSelectedZipcode?.(item.label);
    onItemSelect(item);
    setDropdownItems([]);
    setShowNoResults(false);
    inputRef.current?.blur();
  };

  React.useEffect(() => {
    if (selectedZipcode !== undefined && selectedZipcode !== searchTerm) {
      setSearchTerm(selectedZipcode);
    }
  }, [selectedZipcode, searchTerm]);

  const handleClear = () => {
    setSearchTerm("");
    setDropdownItems([]);
    setShowNoResults(false);
    onSearchClear?.();
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
        className="placeholder-small p-1.4 h-[38px] w-full rounded-lg border-[1.4px] border-gray-400 px-4 py-2 pl-12 pr-10 focus:border-blue-400"
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
      {searchTerm.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleClear}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
        >
          &#x2715;
        </button>
      )}
      {showDropdown && (dropdownItems.length > 0 || showNoResults) && (
        <Dropdown
          items={dropdownItems}
          onItemSelect={handleItemSelect}
          cursor={cursor}
          emptyMessage={showNoResults ? "No results found" : undefined}
        />
      )}
    </div>
  );
}
