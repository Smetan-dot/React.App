import { Link } from 'react-router-dom';
import './Main.css';
import { useAppSelector } from '../../store/hooks';
import { base64ToBlob } from '../../helpers/Helpers';

function Main() {
  const { name, age, email, password, country, gender, image, termsFalg } =
    useAppSelector((store) => store.main.unControl);
  const {
    nameC,
    ageC,
    emailC,
    passwordC,
    countryC,
    genderC,
    imageC,
    termsFlagC,
  } = useAppSelector((store) => store.main.control);
  const styleU = useAppSelector((store) => store.main.style.uncontroll);
  const styleC = useAppSelector((store) => store.main.style.control);

  let objectUrl;
  let objectUrlC;
  if (image !== '') objectUrl = URL.createObjectURL(base64ToBlob(image));
  if (imageC !== '') objectUrlC = URL.createObjectURL(base64ToBlob(imageC));

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
          <div className={`info-tile ${styleU}`}>
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
              {!objectUrl ? '' : <img src={objectUrl} className="tile-image" />}
            </h4>
          </div>
        </div>
        <div className="main-block">
          <Link to={'/react-hook-form'} className="main-link">
            Yes, I{"'"}m control.
          </Link>
          <div className={`info-tile ${styleC}`}>
            <h4 className="tile-item">Name: {nameC}</h4>
            <h4 className="tile-item">Age: {ageC}</h4>
            <h4 className="tile-item">Email: {emailC}</h4>
            <h4 className="tile-item">Password: {passwordC}</h4>
            <h4 className="tile-item">Country: {countryC}</h4>
            <h4 className="tile-item">Gender: {genderC}</h4>
            <h4 className="tile-item">
              Reed T&S: {!termsFlagC ? '' : termsFlagC.toString()}
            </h4>
            <h4 className="tile-item">
              Image:
              {!objectUrlC ? (
                ''
              ) : (
                <img src={objectUrlC} className="tile-image" />
              )}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
