import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage, changeSelect, setCount } from '../../store/slices';

function Pagination() {
  const [first, setFirst] = useState(true);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(false);
  const [last, setLast] = useState(false);

  const page = useAppSelector((store) => store.main.page);
  const count = useAppSelector((store) => store.main.count);
  const perPage = useAppSelector((store) => store.main.perPage);
  const itemsCount = useAppSelector((store) => store.main.itemsCount);
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
  }

  function startPage() {
    dispatch(setCount(1));
    dispatch(setPage(1));
    setFirst(true);
    setPrev(true);
    setNext(false);
    setLast(false);
  }

  function lastPage() {
    dispatch(setCount(Math.ceil(itemsCount / Number(perPage))));
    dispatch(setPage(itemsCount / 10));
    setFirst(false);
    setPrev(false);
    setNext(true);
    setLast(true);
  }

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeSelect(event.target.value));
    startPage();
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={startPage}
        disabled={checkCount2(first)}
      >
        {`<<`}
      </button>
      <button
        className="pagination-button"
        onClick={prevPage}
        disabled={checkCount2(prev)}
      >
        {`<`}
      </button>
      <h3 className="current-page">{checkPage()}</h3>
      <button
        className="pagination-button"
        onClick={nextPage}
        disabled={checkCount(next)}
      >
        {`>`}
      </button>
      <button
        className="pagination-button"
        onClick={lastPage}
        disabled={checkCount(last)}
      >
        {`>>`}
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
