import planet from '../../assets/planet.gif';
import { Planet } from '../Results/Results';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/Context';

function Card(props: { item: Planet }) {
  const { setId } = useContext(AppContext);
  return (
    <li key={props.item.name} className="results-item">
      <h3 className="subhead">
        <img src={planet} alt="planet" />
        {props.item.name}
      </h3>
      <ul className="results-descripsion">
        <li>Diameter: {props.item.diameter}</li>
        <li>Climate: {props.item.climate}</li>
        <li>Terrain: {props.item.terrain}</li>
        <li>Population: {props.item.population}</li>
      </ul>
      <Link
        to={`/details/${props.item.url.split('/').at(-2)}`}
        onClick={() => {
          setId(Number(props.item.url.split('/').at(-2)));
        }}
      >
        Learn more
      </Link>
    </li>
  );
}

export default Card;
