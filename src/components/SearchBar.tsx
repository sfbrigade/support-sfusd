import React, { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Type your school here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
