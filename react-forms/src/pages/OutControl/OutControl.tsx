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
  setErrors,
} from '../../store/slice';
import { convertBase64, SetSchema } from '../../helpers/Helpers';
import { ValidationError } from 'yup';

function OutControl() {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailConfirmRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const flagRef = useRef<HTMLInputElement>(null);

  const countries = useAppSelector((store) => store.main.countries);
  const errors = useAppSelector((store) => store.main.errors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let file: File;
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    file = event.target.files![0];
  }

  const schema = SetSchema();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value,
      age: ageRef.current?.value,
      email: emailRef.current?.value,
      confirmEmail: emailConfirmRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: passwordConfirmRef.current?.value,
      country: countryRef.current?.value,
      gender: genderRef.current?.value,
      flag: flagRef.current?.checked,
      image: imageRef.current?.value,
    };
    try {
      await schema.validate(formData, { abortEarly: false });
      dispatch(setNameU(nameRef.current?.value as string));
      dispatch(setAgeU(ageRef.current?.value as string));
      dispatch(setEmailU(emailRef.current?.value as string));
      dispatch(setPasswordU(passwordRef.current?.value as string));
      dispatch(setCountryU(countryRef.current?.value as string));
      dispatch(setGenderU(genderRef.current?.value as string));
      dispatch(setImageU(await convertBase64(file)));
      dispatch(setFlagU(flagRef.current?.checked as boolean));
      dispatch(setErrors([]));
      navigate('/');
    } catch (error) {
      if (error instanceof ValidationError) {
        dispatch(setErrors(error.errors));
      }
    }
  }

  return (
    <>
      <h1 className="control-heading">Form with useRef</h1>
      <form className="control-form" onSubmit={handleSubmit} noValidate={true}>
        <h2 className="form-heading">Registration form</h2>
        <h4 className="form-description ">
          !!! Use English. All fields must be filled in !!!
        </h4>
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
          <input type="email" name="confirm-email" ref={emailConfirmRef} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Password:</h5>
          <input type="password" name="password" ref={passwordRef} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Confirm password:</h5>
          <input
            type="password"
            name="confirm-password"
            ref={passwordConfirmRef}
          />
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
      <p className="errors-block">
        {errors.map((item, i) => (
          <span key={i}>
            {`${i + 1}) ${item}`}
            <br />
          </span>
        ))}
      </p>
    </>
  );
}

export default OutControl;
