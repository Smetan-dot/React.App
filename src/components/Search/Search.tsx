import React from 'react';
import './Search.css';

function Search(props: {
  handleClick: () => Promise<void>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: () => string;
}) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={props.setValue()}
        onChange={props.handleChange}
      ></input>
      <button className="search-button" onClick={props.handleClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
