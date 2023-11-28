function Control() {
  const countries = ['a', 'b', 'c'];
  return (
    <>
      <h1 className="control-heading">Form with useRef</h1>
      <form className="control-form">
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
          <input type="text" name="name" />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Age:</h5>
          <input type="number" name="age" min={0} />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Email:</h5>
          <input type="email" name="email" />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Confirm email:</h5>
          <input type="email" name="confirm-email" />
        </label>
        <label className="control-lable">
          <h5 className="input-name">Password:</h5>
          <input type="password" name="password" />
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
          <select className="gender-select">
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
          />
        </label>
        <label className="control-lable" id="input-terms">
          <h5 className="input-name">Accept T&C</h5>
          <input type="checkbox" name="t&c" />
        </label>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </>
  );
}

export default Control;
