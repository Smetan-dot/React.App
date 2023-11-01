import './App.css';
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import Search from './components/Search/Search';
import Results, { Planet } from './components/Results/Results';
import loadData from './components/Api/planetRequest';

function App() {
  const [url, setUrl] = useState(checkSearch());
  const [items, setItems] = useState<Planet[]>([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [value, setValue] = useState(checkValue());

  function checkSearch(): string {
    const url = localStorage.getItem('search');
    if (url !== null) return url;
    return 'https://swapi.dev/api/planets/?search=';
  }

  function checkValue(): string {
    const input = localStorage.getItem('input');
    if (input !== null) return input;
    return '';
  }

  async function handleClick() {
    setDataIsLoaded(false);
    loadData(url, setItems, setDataIsLoaded);
    localStorage.setItem('search', url);
    localStorage.setItem('input', value);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUrl(`https://swapi.dev/api/planets/?search=${event.target.value}`);
    setValue(event.target.value);
  }

  function setInputValue() {
    return value;
  }

  useEffect(() => {
    loadData(url, setItems, setDataIsLoaded);
  }, []);

  return (
    <div className="app-container">
      <h1 className="head">Star Wars Planets</h1>
      <Search
        handleClick={handleClick}
        handleChange={handleChange}
        setValue={setInputValue}
      ></Search>
      {!dataIsLoaded ? <Loader></Loader> : <Results items={items}></Results>}
    </div>
  );
}

export default App;
