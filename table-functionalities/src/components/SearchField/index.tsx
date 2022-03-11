import * as _ from "lodash";
import * as React from "react";
import { SEARCH_DELAY } from "src/constants";

import { SearchIcon } from "../SearchIcon";

import "./style.css";

interface Props {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField = ({ title, value, setValue }: Props) => {
  const [input, setInput] = React.useState<string>(value);

  React.useEffect(() => {
    setInput(value);
  }, [value]);

  const debouncedSearch = React.useRef(
    _.debounce((value: string) => {
      setValue(value);
    }, SEARCH_DELAY)
  ).current;

  const handleSearch = (event) => {
    setInput(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <div className="search-field-container">
      <span>{title}</span>
      <div className="search-field">
        <input type="text" value={input} placeholder="Search..." onChange={handleSearch} />
        <div className="search-icon-container">
          <SearchIcon style={{ marginTop: 12, marginLeft: 12 }} />
        </div>
      </div>
    </div>
  );
};

export default SearchField;
