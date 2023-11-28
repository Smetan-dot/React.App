import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
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
