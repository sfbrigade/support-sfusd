import React, { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownItems, setDropdownItems] = useState([]);

  const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setSearchTerm(userInput);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Type your school here..."
        value={searchTerm}
        onChange={onInputChange}
      />
    </div>
  );
}
