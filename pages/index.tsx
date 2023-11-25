import { useEffect } from 'react';
import Search from '../components/Search/Search';
import Results from '../components/Results/Results';
import Pagination from '../components/Pagination/Pagination';
import { useAppDispatch } from '../store/hooks';
import { setItems, setMainFlag, setItemsCount } from '../store/slices';
import { Planet } from '@/types/types';

export const getServerSideProps = async (context: {
  query: { search: string; page: number };
}) => {
  const { search = '', page = 1 } = context.query;
  const response = await fetch(
    `https://swapi.dev/api/planets/?search=${search}&page=${page}`
  );
  const data = await response.json();
  return {
    props: {
      planets: data.results,
      count: data.count,
    },
  };
};

function Main(props: { planets: Planet[]; count: number }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setItems(props.planets));
    dispatch(setItemsCount(props.count));
    dispatch(setMainFlag(true));
  });

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
