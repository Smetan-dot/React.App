import { useEffect } from 'react';
import Search from '../components/Search/Search';
import Results from '../components/Results/Results';
import Pagination from '../components/Pagination/Pagination';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  setItems,
  setMainFlag,
  setValue,
  setPagination,
  setItemsCount,
} from '../store/slices';
import { Planet } from '@/types/types';

export const getServerSideProps = async () => {
  const params = {
    page: 1,
    value: '',
  };
  const response = await fetch(
    `https://swapi.dev/api/planets/?search=${params.value}&page=${params.page}`
  );
  const data = await response.json();
  return {
    props: {
      planets: data.results,
      count: data.count,
    },
  };
};

function Main({ planets, count }: { planets: Planet[]; count: number }) {
  const page = useAppSelector((store) => store.main.page);
  const mainFlag = useAppSelector((store) => store.main.mainFlag);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setItems(planets));
    dispatch(setItemsCount(count));
    dispatch(setPagination(true));
    dispatch(setMainFlag(true));
  }, [page, mainFlag]);

  useEffect(() => {
    const input = localStorage.getItem('input');
    if (input !== null) dispatch(setValue(input));
  }, []);

  return (
    <div className="app-container">
      <h1 className="head">Star Wars Planets</h1>
      <Search></Search>
      <Pagination></Pagination>
      <div className="main-wrapper">
        <Results></Results>
      </div>
    </div>
  );
}

export default Main;
