import { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import Results from '../../components/Results/Results';
import Pagination from '../../components/Pagination/Pagination';
import DetailsDesc from '../../components/DetailsDesc/DetailsDesc';
import { setDetailsFlag, setDetails } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { DetailsPlanet } from '@/types/types';

export const getServerSideProps = async (context: {
  query: { id: number };
}) => {
  const { id } = context.query;
  const response = await fetch(`https://swapi.dev/api/planets/${id}`);
  const data = await response.json();
  return {
    props: {
      planet: data,
    },
  };
};

function Details(props: {
  refWrap: React.RefObject<HTMLDivElement>;
  planet: DetailsPlanet;
}) {
  const dispatch = useAppDispatch();
  const detailsFlag = useAppSelector((store) => store.main.detailsFlag);

  useEffect(() => {
    dispatch(setDetails(props.planet));
    dispatch(setDetailsFlag(true));
  });

  return (
    <div className="app-container">
      <h1 className="head">Star Wars Planets</h1>
      <Search></Search>
      <Pagination></Pagination>
      <div className="main-wrapper">
        <Results></Results>
        <div className="details-container">
          {!detailsFlag ? (
            <Loader></Loader>
          ) : (
            <div ref={props.refWrap}>
              <DetailsDesc></DetailsDesc>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;
