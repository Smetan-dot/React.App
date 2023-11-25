import Link from 'next/link';
import Image from 'next/image';
import { Planet } from '../../types/types';
import { setId } from '../../store/slices';
import { useAppDispatch } from '../../store/hooks';

function Card(props: { item: Planet }) {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h3 className="subhead">
        <Image src="/planet.gif" alt="planet" width={30} height={30} />
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
