import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setValue, setMainFlag, setPage, setCount } from '../../store/slices';

function Search() {
  const value = useAppSelector((store) => store.main.value);
  const [input, setInput] = useState(value);
  const dispatch = useAppDispatch();

  async function handleClick() {
    localStorage.setItem('input', input);
    dispatch(setMainFlag(false));
    dispatch(setValue(input));
    dispatch(setCount(1));
    dispatch(setPage(1));
  }

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button className="search-button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}

export default Search;
