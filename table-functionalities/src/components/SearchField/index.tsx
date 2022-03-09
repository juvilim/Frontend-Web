import * as React from 'react';
import { SearchIcon } from '../SearchIcon';

import './SearchField.css';

interface Props {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField = ({ title, value, setValue }: Props) => {
  // TODO: input focus styling
  const [input, setInput] = React.useState<string>(value);

  React.useEffect(() => {
    setInput(value);
  }, [value]);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = () => {
    setValue(input);
  };

  return (
    <div className="search-field-container">
      <span>{title}</span>
      <div className="search-field">
        <input type="text" value={input} placeholder="Search..." onChange={handleChange} />
        <div className="search-icon-container" onClick={handleSearch}>
          <SearchIcon style={{ marginTop: 12, marginLeft: 12 }} />
        </div>
      </div>
    </div>
  );
};

export default SearchField;