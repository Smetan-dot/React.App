import './Main.css';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import Search from '../components/Search/Search';
import Results from '../components/Results/Results';
import Pagination from '../components/Pagination/Pagination';
import { MainContext } from '../context/Context';
import { useGetPlanetsQuery } from '../store/api';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setItems, setMainFlag } from '../store/slices';

function Main() {
  const [url, setUrl] = useState('');

  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const [itemsCount, setItemsCount] = useState(0);
  const [perPage, setPerPage] = useState('10');
  const [pagination, setPagination] = useState(false);

  const navigate = useNavigate();

  const page = useAppSelector((store) => store.main.page);
  const value = useAppSelector((store) => store.main.value);
  const mainFlag = useAppSelector((store) => store.main.mainFlag);
  const dispatch = useAppDispatch();

  const queryParams = {
    page: page,
    value: value,
  };
  const { data: planets = [], isFetching } = useGetPlanetsQuery(queryParams);

  useEffect(() => {
    if (!isFetching) {
      dispatch(setItems(planets.results));
      setItemsCount(planets.count);
      setPagination(true);
      dispatch(setMainFlag(true));
    }
  }, [isFetching, page, mainFlag]);

  useEffect(() => {
    navigate(`/?search=${value}&page=${page}`);
  }, []);

  return (
    <div className="app-container">
      <h1 className="head">Star Wars Planets</h1>
      <MainContext.Provider
        value={{
          url,
          setUrl,
          //items,
          //setItems,
          dataIsLoaded,
          setDataIsLoaded,
          //page,
          //setPage,
          itemsCount,
          setItemsCount,
          pagination,
          setPagination,
          perPage,
          setPerPage,
        }}
      >
        <Search></Search>

        {!pagination ? '' : <Pagination></Pagination>}
        {isFetching ? (
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
