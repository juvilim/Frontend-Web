import * as React from 'react';

import './Dropdown.css';

interface Props {
  title: string;
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ title, options, selected, setSelected }: Props) => {
  // TODO: replace V with arrow up/down icon based on state
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="dropdown-outer-container">
      <span>{title}</span>
      <div className="dropdown-inner-container">
        <div className="dropdown-field" onClick={() => setIsOpen(!isOpen)}>
          {selected}
          <div className="arrow-icon-container">V</div>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.map((option, index) => {
              return (
                <div className="dropdown-option" key={index} onClick={() => { setSelected(option); setIsOpen(false);}}>
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;