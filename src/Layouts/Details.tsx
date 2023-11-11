import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loadDetails from '../components/Api/detailsRequest';
import Loader from '../components/Loader/Loader';
import DetailsDesc from '../components/DetailsDesc/DetailsDesc';
import { AppContext, DetailsContext } from '../context/Context';
import './Details.css';

export type DetailsPlanet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  url: string;
};

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
  const [detailsIsLoaded, setDetailsIsLoaded] = useState(false);
  const { id } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadDetails(id, setState, setDetailsIsLoaded);
  }, []);

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Node;
    if (props.refWrap.current && !props.refWrap.current.contains(target))
      navigate(-1);
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <DetailsContext.Provider
      value={{ state, setState, detailsIsLoaded, setDetailsIsLoaded }}
    >
      <div className="details-container">
        {!detailsIsLoaded ? (
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
