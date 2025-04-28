import React, { useState } from "react";
import "./searchbar.css";
import { FiSearch } from "react-icons/fi"; // Optional: You can use any icon or remove it

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="searchbar-container">
      <form className="searchbar-form" onSubmit={handleSubmit}>
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for gifts, decor, and more..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
