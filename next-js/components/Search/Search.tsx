import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setValue, setMainFlag, setPage, setCount } from '../../store/slices';
import Router from 'next/router';

function Search() {
  function checkValue(): string {
    const input = localStorage.getItem('input');
    if (input !== null) return input;
    return '';
  }

  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  async function handleClick() {
    localStorage.setItem('input', input);
    dispatch(setMainFlag(false));
    dispatch(setValue(input));
    dispatch(setCount(1));
    dispatch(setPage(1));
    Router.push(`/?search=${input}&page=1`);
  }

  useEffect(() => {
    setInput(checkValue());
  }, []);

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
