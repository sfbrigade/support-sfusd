import React, { useState } from "react";

import Dropdown from "./Dropdown";
import SearchIcon from "../../public/icons/search-icon.svg";

export interface DropdownItem<ItemType> {
  label: string;
  value: string;
  item: ItemType;
}

interface SearchBarProps<DropdownItemType> {
  onItemSelect: (item: DropdownItem<DropdownItemType>) => void;
  onSearch: (searchTerm: string) => Promise<DropdownItem<DropdownItemType>[]>;
}

export default function SearchBar<DropdownItemType = any>({
  onItemSelect,
  onSearch,
}: SearchBarProps<DropdownItemType>): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownItems, setDropdownItems] = useState<DropdownItem<DropdownItemType>[]>([]);
  const [cursor, setCursor] = useState(-1);

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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Does not handle keys if dropdown is empty
    if (dropdownItems.length === 0) {
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor(prev => 
        prev < dropdownItems.length - 1 ? prev + 1 : prev
      )
    }
    else if (e.key === "ArrowUp"){
      e.preventDefault();
      setCursor(prev => 
        prev > 0 ? prev - 1 : prev
      )
    }
    else if (e.key === "Enter" && cursor >= 0) {
      e.preventDefault();
      handleItemSelect(dropdownItems[cursor]);
    }
  };

  return (
    <div className="relative flex-grow">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <SearchIcon className="fill-[#949494]" height="24" width="24" />
      </div>
      <input
        type="text"
        placeholder="Type school name, zip code, or neighborhood"
        value={searchTerm}
        className="placeholder-small h-[38px] w-full rounded-lg border border-black p-1 px-4 py-2 pl-12 shadow-lg focus:border-blue-400"
        onChange={onInputChange}
        onFocus={() => 
          {
            if (searchTerm.length > 0) {
              // Re-trigger search to show dropdown
              onSearch(searchTerm).then(setDropdownItems);
            }
          }
        }
        onBlur={() => 
          {
            // Hide dropdown when input loses focus
            setDropdownItems([]);
            setCursor(-1);
          }
        }
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
