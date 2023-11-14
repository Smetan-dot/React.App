import React from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MainContext } from '../../context/Context';
import loadData from '../Api/planetRequest';

function Search() {
  const {
    url,
    setUrl,
    setItems,
    setDataIsLoaded,
    setPage,
    setItemsCount,
    setPagination,
    value,
    setValue,
  } = useContext(MainContext);
  const navigate = useNavigate();

  async function handleClick() {
    setDataIsLoaded(false);
    loadData(url, setItems, setDataIsLoaded, setItemsCount, setPagination);
    localStorage.setItem('search', url);
    localStorage.setItem('input', value);
    navigate(`/?search=${value}&page=1`);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUrl(
      `https://swapi.dev/api/planets/?search=${event.target.value}&page=1`
    );
    setPage(1);
    setValue(event.target.value);
  }

  function setInputValue() {
    return value;
  }
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={setInputValue()}
        onChange={handleChange}
      ></input>
      <button className="search-button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
