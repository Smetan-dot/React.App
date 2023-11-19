import { useEffect, useState, useContext } from 'react';
import Loader from '../../components/Loader/Loader';
import DetailsDesc from '../../components/DetailsDesc/DetailsDesc';
import { AppContext, DetailsContext } from '../../context/Context';
import './Details.css';
import { useGetDetailsQuery } from '../../store/api';
import { setDetailsFlag } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function Details(props: { refWrap: React.RefObject<HTMLDivElement> }) {
  const [state, setState] = useState({
    name: '',
    rotation_period: '',
    orbital_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    population: '',
    url: '',
  });

  const { id } = useContext(AppContext);
  const dispatch = useAppDispatch();
  const detailsFlag = useAppSelector((store) => store.main.detailsFlag);

  const { data: details, isFetching } = useGetDetailsQuery(id);

  useEffect(() => {
    if (!isFetching) {
      setState(details);
      dispatch(setDetailsFlag(true));
    }
  }, [isFetching]);

  return (
    <DetailsContext.Provider value={{ state, setState }}>
      <div className="details-container">
        {!detailsFlag ? (
          <Loader></Loader>
        ) : (
          <div ref={props.refWrap}>
            <DetailsDesc></DetailsDesc>
          </div>
        )}
      </div>
    </DetailsContext.Provider>
  );
}

export default Details;
