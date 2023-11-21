import { useNavigate } from 'react-router-dom';
import { DetailsContext } from '../../context/Context';
import { useContext } from 'react';
import { setDetailsFlag } from '../../store/slices';
import { useAppDispatch } from '../../store/hooks';

function DetailsDesc() {
  const { state } = useContext(DetailsContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="details-header">
        <h2 className="details-head">{state.name}</h2>
        <button
          className="details-close"
          onClick={() => {
            navigate(-1);
            dispatch(setDetailsFlag(false));
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
  );
}

export default DetailsDesc;
