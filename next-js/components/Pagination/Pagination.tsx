import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage, changeSelect, setCount } from '../../store/slices';
import Router from 'next/router';

function Pagination() {
  const page = useAppSelector((store) => store.main.page);
  const count = useAppSelector((store) => store.main.count);
  const perPage = useAppSelector((store) => store.main.perPage);
  const itemsCount = useAppSelector((store) => store.main.itemsCount);
  const value = useAppSelector((store) => store.main.value);
  const dispatch = useAppDispatch();

  function checkPage() {
    if (perPage === '5') return count;
    return page;
  }

  function nextPage() {
    if (page === itemsCount / 10) return;

    if (perPage === '5') {
      dispatch(setCount(count + 1));
      if (count % 2 === 0) {
        dispatch(setPage(page + 1));
        Router.push(`/?search=${value}&page=${page + 1}`);
      }
    } else {
      dispatch(setPage(page + 1));
      Router.push(`/?search=${value}&page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page === 1) return;

    if (perPage === '5') {
      dispatch(setCount(count - 1));
      if (count % 2 === 1) {
        dispatch(setPage(page - 1));
        Router.push(`/?search=${value}&page=${page - 1}`);
      }
    } else {
      dispatch(setPage(page - 1));
      Router.push(`/?search=${value}&page=${page - 1}`);
    }
  }

  function startPage() {
    if (page === 1) return;

    dispatch(setCount(1));
    dispatch(setPage(1));
    Router.push(`/?search=${value}&page=${1}`);
  }

  function lastPage() {
    if (page === itemsCount / 10) return;

    dispatch(setCount(Math.ceil(itemsCount / Number(perPage))));
    dispatch(setPage(itemsCount / 10));
    Router.push(`/?search=${value}&page=${itemsCount / 10}`);
  }

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeSelect(event.target.value));
    startPage();
  }

  return (
    <div className="pagination-container">
      <button className="pagination-button" onClick={startPage}>
        {`<<`}
      </button>
      <button className="pagination-button" onClick={prevPage}>
        {`<`}
      </button>
      <h3 className="current-page">{checkPage()}</h3>
      <button className="pagination-button" onClick={nextPage}>
        {`>`}
      </button>
      <button className="pagination-button" onClick={lastPage}>
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
