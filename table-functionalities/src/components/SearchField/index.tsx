import * as React from 'react';

import './SearchField.css';

interface Props {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField = ({ title, value, setValue }: Props) => {
  // TODO: replace O\ with search icon, input focus styling
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
        <div className="search-icon-container" onClick={handleSearch}>O\</div>
      </div>
    </div>
  );
};

export default SearchField;