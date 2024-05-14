import React, { useState } from "react";

import Dropdown from "./Dropdown";

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
  const [dropdownItems, setDropdownItems] = useState<
    DropdownItem<DropdownItemType>[]
  >([]);

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);
    const searchResults = await onSearch(userInput);
    setDropdownItems(searchResults);
  };

  const handleItemSelect = (item: DropdownItem<DropdownItemType>) => {
    setSearchTerm(item.label);
    onItemSelect(item);
    setDropdownItems([]);
  };

  return (
    <div className="relative flex-grow">
      <input
        type="text"
        placeholder="Type your school here..."
        value={searchTerm}
        className="h-[38px] w-full rounded-lg border border-black p-1 px-4 py-2 shadow-lg focus:border-blue-400"
        onChange={onInputChange}
        onFocus={() => setSearchTerm("")}
      />
      {dropdownItems.length > 0 && searchTerm.length > 0 && (
        <Dropdown items={dropdownItems} onItemSelect={handleItemSelect} />
      )}
    </div>
  );
}
