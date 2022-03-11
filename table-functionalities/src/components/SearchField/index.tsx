import * as React from "react";

import { SearchIcon } from "../SearchIcon";

import "./style.css";

interface Props {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField = ({ title, value, setValue }: Props) => {
  const handleSearch = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="search-field-container">
      <span>{title}</span>
      <div className="search-field">
        <input type="text" value={value} placeholder="Search..." onChange={handleSearch} />
        <div className="search-icon-container">
          <SearchIcon style={{ marginTop: 12, marginLeft: 12 }} />
        </div>
      </div>
    </div>
  );
};

export default SearchField;
