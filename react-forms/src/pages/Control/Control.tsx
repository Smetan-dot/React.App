import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SetSchema, convertBase64 } from '../../helpers/Helpers';
import {
  setNameC,
  setAgeC,
  setEmailC,
  setPasswordC,
  setCountryC,
  setGenderC,
  setImageC,
  setFlagC,
} from '../../store/slice';

function Control() {
  const countries = useAppSelector((store) => store.main.countries);
  const schema = SetSchema();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let file: File;
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    file = event.target.files![0];
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });
  const setData = async (data: FieldValues) => {
    dispatch(setNameC(data.name));
    dispatch(setAgeC(data.age));
    dispatch(setEmailC(data.email));
    dispatch(setPasswordC(data.password));
    dispatch(setCountryC(data.country));
    dispatch(setGenderC(data.gender));
    dispatch(setImageC(await convertBase64(file)));
    dispatch(setFlagC(data.flag));
    navigate('/');
  };
  return (
    <>
      <h1 className="control-heading">React Hook Form</h1>
      <form className="control-form" onSubmit={handleSubmit(setData)}>
        <h2 className="form-heading">Registration form</h2>
        <h4 className="form-description ">
          !!! Use English. All fields must be filled in !!!
        </h4>
        <label className="control-lable">
          <h5 className="input-name">Name:</h5>
          <input type="text" {...register('name')} />
        </label>
        <div className="error-string">
          {errors?.name && <p>{errors?.name?.message || 'Error'}</p>}
        </div>
        <label className="control-lable">
          <h5 className="input-name">Age:</h5>
          <input type="number" {...register('age')} />
        </label>
        <div className="error-string">
          {errors?.age && <p>{errors?.age?.message || 'Error'}</p>}
        </div>
        <label className="control-lable">
          <h5 className="input-name">Email:</h5>
          <input type="email" {...register('email')} />
        </label>
        <div className="error-string">
          {errors?.email && <p>{errors?.email?.message || 'Error'}</p>}
        </div>
        <label className="control-lable">
          <h5 className="input-name">Confirm email:</h5>
          <input type="email" {...register('confirmEmail')} />
        </label>
        <div className="error-string">
          {errors?.confirmEmail && (
            <p>{errors?.confirmEmail?.message || 'Error'}</p>
          )}
        </div>
        <label className="control-lable">
          <h5 className="input-name">Password:</h5>
          <input type="password" {...register('password')} />
        </label>
        <div className="error-string">
          {errors?.password && <p>{errors?.password?.message || 'Error'}</p>}
        </div>
        <label className="control-lable">
          <h5 className="input-name">Confirm password:</h5>
          <input type="password" {...register('confirmPassword')} />
        </label>
        <div className="error-string">
          {errors?.confirmPassword && (
            <p>{errors?.confirmPassword?.message || 'Error'}</p>
          )}
        </div>
        <label className="control-lable">
          <h5 className="input-name">Country:</h5>
          <input
            type="text"
            list="countries"
            autoComplete="on"
            {...register('country')}
          />
          <datalist id="countries">
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </datalist>
        </label>
        <div className="error-string">
          {errors?.country && <p>{errors?.country?.message || 'Error'}</p>}
        </div>
        <label className="control-lable">
          <h5 className="input-name" id="select-name">
            Gender:
          </h5>
          <select className="gender-select" {...register('gender')}>
            <option hidden></option>
            <option value={'male'}>male</option>
            <option value={'female'}>female</option>
          </select>
        </label>
        <div className="error-string">
          {errors?.gender && <p>{errors?.gender?.message || 'Error'}</p>}
        </div>
        <label className="control-lable">
          <h5 className="input-name" id="input-image">
            Image{'(png or jpeg)'}:
          </h5>
          <input
            type="file"
            accept=".png, .jpeg"
            size={100000}
            id="insert-image"
            {...register('image')}
            onChange={handleChange}
          />
        </label>
        <div className="error-string">
          {errors?.image && <p>{errors?.image?.message || 'Error'}</p>}
        </div>
        <div className="submit-block">
          <label className="control-lable" id="input-terms">
            <h5 className="input-name">Accept T&C</h5>
            <input type="checkbox" {...register('flag')} />
          </label>
          <div className="error-string" id="terms-error">
            {errors?.flag && <p>{errors?.flag?.message || 'Error'}</p>}
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Control;
