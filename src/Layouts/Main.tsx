import './Main.css';
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Search from '../components/Search/Search';
import Results, { Planet } from '../components/Results/Results';
import loadData from '../components/Api/planetRequest';
import Pagination from '../components/Pagination/Pagination';

function Main(props: { setId: React.Dispatch<React.SetStateAction<number>> }) {
  const [url, setUrl] = useState(checkSearch());
  const [items, setItems] = useState<Planet[]>([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [value, setValue] = useState(checkValue());
  const [page, setPage] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [perPage, setPerPage] = useState('10');
  const [pagination, setPagination] = useState(false);

  const navigate = useNavigate();

  function checkSearch(): string {
    const url = localStorage.getItem('search');
    if (url !== null) return url;
    return `https://swapi.dev/api/planets/?search=&page=1`;
  }

  function checkValue(): string {
    const input = localStorage.getItem('input');
    if (input !== null) return input;
    return '';
  }

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

  useEffect(() => {
    loadData(url, setItems, setDataIsLoaded, setItemsCount, setPagination);
    navigate(`/?search=${value}&page=1`);
  }, []);

  return (
    <div className="app-container">
      <h1 className="head">Star Wars Planets</h1>
      <Search
        handleClick={handleClick}
        handleChange={handleChange}
        setValue={setInputValue}
      ></Search>
      {!pagination ? (
        ''
      ) : (
        <Pagination
          url={url}
          value={value}
          setItems={setItems}
          setDataIsLoaded={setDataIsLoaded}
          itemsCount={itemsCount}
          setItemsCount={setItemsCount}
          page={page}
          setPage={setPage}
          setPagination={setPagination}
          perPage={perPage}
          setPerPage={setPerPage}
          loadData={loadData}
        ></Pagination>
      )}
      {!dataIsLoaded ? (
        <Loader></Loader>
      ) : (
        <div className="main-wrapper">
          <Results
            items={items}
            setId={props.setId}
            perPage={perPage}
            page={page}
          ></Results>
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default Main;
