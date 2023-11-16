import './Pagination.css';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../context/Context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage, changeSelect, setCount } from '../../store/slices';

function Pagination() {
  const [first, setFirst] = useState(true);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(false);
  const [last, setLast] = useState(false);
  const navigate = useNavigate();

  const { itemsCount } = useContext(MainContext);

  const page = useAppSelector((store) => store.main.page);
  const count = useAppSelector((store) => store.main.count);
  const perPage = useAppSelector((store) => store.main.perPage);
  const value = useAppSelector((store) => store.main.value);
  const dispatch = useAppDispatch();

  function checkPage() {
    if (perPage === '5') return count;
    return page;
  }

  function checkCount(button: boolean) {
    if (itemsCount <= Number(perPage)) return true;
    return button;
  }

  function checkCount2(button: boolean) {
    if (checkPage() === 1) return true;
    return button;
  }

  function nextPage() {
    if (perPage === '5') {
      dispatch(setCount(count + 1));
      if (count % 2 === 0) {
        dispatch(setPage(page + 1));
      }
    } else dispatch(setPage(page + 1));

    if (checkPage() + 1 === Math.ceil(itemsCount / Number(perPage))) {
      setLast(true);
      setNext(true);
    }
    setFirst(false);
    setPrev(false);
    navigate(`/?search=${value}&page=${checkPage() + 1}`);
  }

  function prevPage() {
    if (perPage === '5') {
      dispatch(setCount(count - 1));
      if (count % 2 === 1) {
        dispatch(setPage(page - 1));
      }
    } else dispatch(setPage(page - 1));

    if (checkPage() - 1 === 1) {
      setFirst(true);
      setPrev(true);
    }
    setLast(false);
    setNext(false);
    navigate(`/?search=${value}&page=${checkPage() - 1}`);
  }

  function startPage() {
    dispatch(setCount(1));
    dispatch(setPage(1));
    setFirst(true);
    setPrev(true);
    setNext(false);
    setLast(false);
    navigate(`/?search=${value}&page=1`);
  }

  function lastPage() {
    dispatch(setCount(Math.ceil(itemsCount / Number(perPage))));
    dispatch(setPage(itemsCount / 10));
    setFirst(false);
    setPrev(false);
    setNext(true);
    setLast(true);
    navigate(
      `/?search=${value}&page=${Math.ceil(itemsCount / Number(perPage))}`
    );
  }

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeSelect(event.target.value));
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
      <h3 className="current-page">{checkPage()}</h3>
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
