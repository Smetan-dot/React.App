import { setDetailsFlag } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useRouter } from 'next/router';

function DetailsDesc() {
  const details = useAppSelector((store) => store.main.details);
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <div>
      <div className="details-header">
        <h2 className="details-head">{details.name}</h2>
        <button
          className="details-close"
          onClick={() => {
            dispatch(setDetailsFlag(false));
            router.back();
          }}
        >
          x
        </button>
      </div>
      <ul className="details-descripsion">
        <li>Rotation period: {details.rotation_period}</li>
        <li>Orbital period: {details.orbital_period}</li>
        <li>Diameter: {details.diameter}</li>
        <li>Climate: {details.climate}</li>
        <li>Gravity: {details.gravity}</li>
        <li>Terrain: {details.terrain}</li>
        <li>Surface water: {details.surface_water}</li>
        <li>Population: {details.population}</li>
        <li>URL: {details.url}</li>
      </ul>
    </div>
  );
}

export default DetailsDesc;
