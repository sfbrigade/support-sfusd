import React, { useState } from "react";
import Schools from "@/data/schools";
import Select from "react-select"

interface DropdownItem<ItemType> {
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

  const options = Schools.map((school, index) => {
    return {
       label: school.name,
       value: school,
       key: index
    }
});

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue="Type your school here..."
        onChange={onInputChange}
        value={searchTerm}
        options={dropdownItems}
      />
    </div>
  );
}
