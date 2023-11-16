import './Results.css';
import planet from '../../assets/planet.gif';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/Context';
import { useAppSelector } from '../../store/hooks';

function Results() {
  const count = useAppSelector((store) => store.main.count);
  const items = useAppSelector((store) => store.main.items);
  const perPage = useAppSelector((store) => store.main.perPage);
  const { setId } = useContext(AppContext);

  function checkArray() {
    if (perPage === '5' && count % 2 === 0)
      return items.slice(Number(perPage), Number(perPage) * 2);
    return items.slice(0, Number(perPage));
  }

  return (
    <div className="results-container">
      {items.length === 0 ? (
        <h2 className="not-found">Planets not found, try again</h2>
      ) : (
        checkArray().map((item) => (
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
