import './Main.css';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Search from '../components/Search/Search';
import Results, { Planet } from '../components/Results/Results';
import loadData from '../components/Api/planetRequest';
import Pagination from '../components/Pagination/Pagination';
import { MainContext } from '../context/Context';

function Main() {
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

  useEffect(() => {
    loadData(url, setItems, setDataIsLoaded, setItemsCount, setPagination);
    navigate(`/?search=${value}&page=1`);
  }, []);

  return (
    <div className="app-container">
      <h1 className="head">Star Wars Planets</h1>
      <MainContext.Provider
        value={{
          url,
          setUrl,
          items,
          setItems,
          dataIsLoaded,
          setDataIsLoaded,
          page,
          setPage,
          itemsCount,
          setItemsCount,
          pagination,
          setPagination,
          value,
          setValue,
          perPage,
          setPerPage,
        }}
      >
        <Search></Search>

        {!pagination ? '' : <Pagination></Pagination>}
        {!dataIsLoaded ? (
          <Loader></Loader>
        ) : (
          <div className="main-wrapper">
            <Results></Results>
            <Outlet />
          </div>
        )}
      </MainContext.Provider>
    </div>
  );
}

export default Main;
