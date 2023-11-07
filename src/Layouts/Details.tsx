import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import loadDetails from '../components/Api/detailsRequest';
import Loader from '../components/Loader/Loader';
import { AppContext } from '../context/Context';
import './Details.css';

export type DetailsType = {
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
    <div className="details-container">
      {!detailsIsLoaded ? (
        <Loader></Loader>
      ) : (
        <div ref={props.refWrap}>
          <div className="details-header">
            <h2 className="details-head">{state.name}</h2>
            <button
              className="details-close"
              onClick={() => {
                navigate(-1);
              }}
            >
              x
            </button>
          </div>
          <ul className="details-descripsion">
            <li>Rotation period: {state.rotation_period}</li>
            <li>Orbital period: {state.orbital_period}</li>
            <li>Diameter: {state.diameter}</li>
            <li>Climate: {state.climate}</li>
            <li>Gravity: {state.gravity}</li>
            <li>Terrain: {state.terrain}</li>
            <li>Surface water: {state.surface_water}</li>
            <li>Population: {state.population}</li>
            <li>URL: {state.url}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Details;
