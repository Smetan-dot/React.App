import './OutControl.css';
import { FormEvent, useRef, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setNameU,
  setAgeU,
  setEmailU,
  setPasswordU,
  setCountryU,
  setGenderU,
  setImageU,
  setFlagU,
} from '../../store/slice';
import { convertBase64 } from '../../helpers/Helpers';

function OutControl() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const flagRef = useRef<HTMLInputElement>(null);

  const countries = useAppSelector((store) => store.main.countries);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  let file: File;
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    file = event.target.files![0];
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(setNameU(nameRef.current?.value as string));
    dispatch(setAgeU(ageRef.current?.value as string));
    dispatch(setEmailU(emailRef.current?.value as string));
    dispatch(setPasswordU(passwordRef.current?.value as string));
    dispatch(setCountryU(countryRef.current?.value as string));
    dispatch(setGenderU(genderRef.current?.value as string));
    dispatch(setImageU(await convertBase64(file)));
    dispatch(setFlagU(flagRef.current?.checked as boolean));
    navigate('/');
  }

  return (
    <>
      <h1 className="control-heading">Form with useRef</h1>
      <form className="control-form" onSubmit={handleSubmit}>
        <h2 className="form-heading">Registration form</h2>
        <h4 className="form-description ">
          !!! All fields must be filled in !!!
        </h4>
        <p className="form-description">
          {
            '(password should contain 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)'
          }
        </p>
        <label className="control-lable">
          <h5 className="input-name">Name:</h5>
          <input type="text" name="name" ref={nameRef} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Age:</h5>
          <input type="number" name="age" min={0} ref={ageRef} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Email:</h5>
          <input type="email" name="email" ref={emailRef} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Confirm email:</h5>
          <input type="email" name="confirm-email" />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Password:</h5>
          <input type="password" name="password" ref={passwordRef} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Confirm password:</h5>
          <input type="password" name="confirm-password" />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Country:</h5>
          <input
            type="text"
            name="country"
            list="countries"
            autoComplete="on"
            ref={countryRef}
          />
          <datalist id="countries">
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </datalist>
        </label>
        <label className="control-lable">
          <h5 className="input-name" id="select-name">
            Gender:
          </h5>
          <select className="gender-select" ref={genderRef}>
            <option hidden></option>
            <option value={'male'}>male</option>
            <option value={'female'}>female</option>
          </select>
        </label>
        <label className="control-lable">
          <h5 className="input-name" id="input-image">
            Image{'(png or jpeg)'}:
          </h5>
          <input
            type="file"
            name="file"
            accept=".png, .jpeg"
            size={100000}
            id="insert-image"
            ref={imageRef}
            onChange={handleChange}
          />
        </label>
        <label className="control-lable" id="input-terms">
          <h5 className="input-name">Accept T&C</h5>
          <input type="checkbox" name="t&c" ref={flagRef} />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}

export default OutControl;
