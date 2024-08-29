// Header.js
import React, { useState } from "react";
import "./Header.css";
import { FaArrowRightLong } from "react-icons/fa6";

const Header = ({ fetchNotesByTitle }) => {
  const [searchTitle, setSearchTitle] = useState("");

  const handleSearch = async () => {
    await fetchNotesByTitle(searchTitle);
  };

  return (
    <div className="header">
      <h1>How can we help?</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <FaArrowRightLong
          className="search-icon"
          size={15}
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default Header;
