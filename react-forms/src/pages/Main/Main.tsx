import { Link } from 'react-router-dom';
import './Main.css';
import { useAppSelector } from '../../store/hooks';
import { base64ToBlob } from '../../helpers/Helpers';

function Main() {
  const { name, age, email, password, country, gender, image, termsFalg } =
    useAppSelector((store) => store.main.unControl);
  let objectURL;
  if (image !== '') objectURL = URL.createObjectURL(base64ToBlob(image));
  return (
    <>
      <h1 className="main-heading">
        React.
        <span className="red">Forms</span>
      </h1>
      <div className="main-wrapper">
        <div className="main-block">
          <Link to={'/uncontrol'} className="main-link">
            Stay out control!
          </Link>
          <div className="info-tile">
            <h4 className="tile-item">Name: {name}</h4>
            <h4 className="tile-item">Age: {age}</h4>
            <h4 className="tile-item">Email: {email}</h4>
            <h4 className="tile-item">Password: {password}</h4>
            <h4 className="tile-item">Country: {country}</h4>
            <h4 className="tile-item">Gender: {gender}</h4>
            <h4 className="tile-item">
              Reed T&S: {!termsFalg ? '' : termsFalg.toString()}
            </h4>
            <h4 className="tile-item">
              Image:
              {!objectURL ? '' : <img src={objectURL} className="tile-image" />}
            </h4>
          </div>
        </div>
        <div className="main-block">
          <Link to={'/react-hook-form'} className="main-link">
            Yes, I{"'"}m control.
          </Link>
        </div>
      </div>
    </>
  );
}

export default Main;
