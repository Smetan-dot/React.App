import './Results.css';
import planet from '../../assets/planet.gif';
import { Link } from 'react-router-dom';

export type Planet = {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
  url: string;
};

function Results(props: {
  items: Planet[];
  setId: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="results-container">
      {props.items.length === 0 ? (
        <h2 className="not-found">Planets not found, try again</h2>
      ) : (
        props.items.map((item) => (
          <li key={item.name} className="results-item">
            <h3 className="subhead">
              <img src={planet} alt="planet" />
              {item.name}
            </h3>
            <ul className="results-descripsion">
              <li>Diameter: {item.diameter}</li>
              <li>Climate: {item.climate}</li>
              <li>Terrain: {item.terrain}</li>
              <li>Population: {item.population}</li>
            </ul>
            <Link
              to={`/details/${item.url.split('/').at(-2)}`}
              onClick={() => {
                props.setId(Number(item.url.split('/').at(-2)));
              }}
            >
              Learn more
            </Link>
          </li>
        ))
      )}
    </div>
  );
}

export default Results;
