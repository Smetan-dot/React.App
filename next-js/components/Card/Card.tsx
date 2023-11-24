import Link from 'next/link';
import { Planet } from '../../types/types';
import { setId } from '../../store/slices';
import { useAppDispatch } from '../../store/hooks';

function Card(props: { item: Planet }) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3 className="subhead">
        <img src="/planet.gif" alt="planet" />
        {props.item.name}
      </h3>
      <ul className="results-descripsion">
        <li>Diameter: {props.item.diameter}</li>
        <li>Climate: {props.item.climate}</li>
        <li>Terrain: {props.item.terrain}</li>
        <li>Population: {props.item.population}</li>
      </ul>
      <Link
        href={`/details/${props.item.url.split('/').at(-2)}`}
        onClick={() => {
          dispatch(setId(Number(props.item.url.split('/').at(-2))));
        }}
      >
        Learn more
      </Link>
    </div>
  );
}

export default Card;
