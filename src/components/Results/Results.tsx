import './Results.css';
import planet from '../../assets/planet.gif';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { useAppSelector } from '../../store/hooks';

export type Planet = {
  name: string;
  diameter: string;
  climate: string;
  terrain: string;
  population: string;
  url: string;
};

function Results() {
  const page = useAppSelector((store) => store.main.page);
  const items = useAppSelector((store) => store.main.items);
  const perPage = useAppSelector((store) => store.main.perPage);
  const { setId } = useContext(AppContext);
  if (perPage === '5' && page % 2 === 0)
    return (
      <div className="results-container">
        {items.length === 0 ? (
          <h2 className="not-found">Planets not found, try again</h2>
        ) : (
          items.slice(Number(perPage), Number(perPage) * 2).map((item) => (
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
                  setId(Number(item.url.split('/').at(-2)));
                }}
              >
                Learn more
              </Link>
            </li>
          ))
        )}
      </div>
    );
  return (
    <div className="results-container">
      {items.length === 0 ? (
        <h2 className="not-found">Planets not found, try again</h2>
      ) : (
        items.slice(0, Number(perPage)).map((item) => (
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
                setId(Number(item.url.split('/').at(-2)));
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
