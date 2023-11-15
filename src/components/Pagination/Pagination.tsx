import './Pagination.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../context/Context';

function Pagination() {
  const [first, setFirst] = useState(true);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(false);
  const [last, setLast] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const { value, itemsCount, page, setPage, perPage, setPerPage } =
    useContext(MainContext);

  function checkCount(button: boolean) {
    if (itemsCount <= Number(perPage)) return true;
    return button;
  }

  function checkCount2(button: boolean) {
    if (page === 1) return true;
    return button;
  }

  function nextPage() {
    if (perPage === '5') {
      if (page % 2 === 0) {
        setCount(count + 1);
      }
    }

    setPage(page + 1);
    if (page + 1 === Math.ceil(itemsCount / Number(perPage))) {
      setLast(true);
      setNext(true);
    }
    setFirst(false);
    setPrev(false);
    navigate(`/?search=${value}&page=${page + 1}`);
  }

  function prevPage() {
    if (perPage === '5') {
      if (page % 2 === 1) {
        setCount(count - 1);
      }
    }

    setPage(page - 1);
    if (page - 1 === 1) {
      setFirst(true);
      setPrev(true);
    }
    setLast(false);
    setNext(false);
    navigate(`/?search=${value}&page=${page - 1}`);
  }

  function startPage() {
    setCount(0);
    setPage(1);
    setFirst(true);
    setPrev(true);
    setNext(false);
    setLast(false);
    navigate(`/?search=${value}&page=1`);
  }

  function lastPage() {
    setCount(itemsCount / 10);
    setPage(Math.ceil(itemsCount / Number(perPage)));
    setFirst(false);
    setPrev(false);
    setNext(true);
    setLast(true);
    navigate(
      `/?search=${value}&page=${Math.ceil(itemsCount / Number(perPage))}`
    );
  }

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(event.target.value);
    startPage();
  }

  const toStart = '<<';
  const toEnd = '>>';
  const toNext = '>';
  const toPrev = '<';
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={startPage}
        disabled={checkCount2(first)}
      >
        {toStart}
      </button>
      <button
        className="pagination-button"
        onClick={prevPage}
        disabled={checkCount2(prev)}
      >
        {toPrev}
      </button>
      <h3 className="current-page">{page}</h3>
      <button
        className="pagination-button"
        onClick={nextPage}
        disabled={checkCount(next)}
      >
        {toNext}
      </button>
      <button
        className="pagination-button"
        onClick={lastPage}
        disabled={checkCount(last)}
      >
        {toEnd}
      </button>
      <select
        className="pagination-select"
        defaultValue={perPage}
        onChange={handleClick}
      >
        <option value={10}>10</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
}

export default Pagination;
