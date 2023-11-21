import './Results.css';
import { useAppSelector } from '../../store/hooks';
import Card from '../Card/Card';

function Results() {
  const count = useAppSelector((store) => store.main.count);
  const items = useAppSelector((store) => store.main.items);
  const perPage = useAppSelector((store) => store.main.perPage);

  function checkArray() {
    const array = Array.from(items);
    if (perPage === '5' && count % 2 === 0)
      return array.slice(Number(perPage), Number(perPage) * 2);
    return array.slice(0, Number(perPage));
  }

  return (
    <div className="results-container">
      {checkArray().length === 0 ? (
        <h2 className="not-found">Planets not found, try again</h2>
      ) : (
        checkArray().map((item) => (
          <li key={item.name} className="results-item">
            <Card item={item} />
          </li>
        ))
      )}
    </div>
  );
}

export default Results;
