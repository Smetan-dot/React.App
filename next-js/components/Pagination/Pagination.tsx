import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPage, changeSelect, setCount } from '../../store/slices';
import { useRouter } from 'next/router';

function Pagination() {
  const page = useAppSelector((store) => store.main.page);
  const count = useAppSelector((store) => store.main.count);
  const perPage = useAppSelector((store) => store.main.perPage);
  const itemsCount = useAppSelector((store) => store.main.itemsCount);
  const value = useAppSelector((store) => store.main.value);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function checkPage() {
    if (perPage === '5') return count;
    return page;
  }

  function nextPage() {
    if (page === Math.ceil(itemsCount / 10)) return;

    if (perPage === '5') {
      dispatch(setCount(count + 1));
      if (count % 2 === 0) {
        dispatch(setPage(page + 1));
        router.push(`/?search=${value}&page=${page + 1}`);
      }
    } else {
      dispatch(setPage(page + 1));
      router.push(`/?search=${value}&page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page === 1) return;

    if (perPage === '5') {
      dispatch(setCount(count - 1));
      if (count % 2 === 1) {
        dispatch(setPage(page - 1));
        router.push(`/?search=${value}&page=${page - 1}`);
      }
    } else {
      dispatch(setPage(page - 1));
      router.push(`/?search=${value}&page=${page - 1}`);
    }
  }

  function startPage() {
    if (page === 1) return;

    dispatch(setCount(1));
    dispatch(setPage(1));
    router.push(`/?search=${value}&page=${1}`);
  }

  function lastPage() {
    if (page === Math.ceil(itemsCount / 10)) return;

    dispatch(setCount(Math.ceil(itemsCount / Number(perPage))));
    dispatch(setPage(Math.ceil(itemsCount / 10)));
    router.push(`/?search=${value}&page=${Math.ceil(itemsCount / 10)}`);
  }

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(changeSelect(event.target.value));
    startPage();
  }

  function handleHoverLeft(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    if (page === 1) target.classList.add('disable');
  }

  function handleHoverRight(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    if (page === Math.ceil(itemsCount / 10)) target.classList.add('disable');
  }

  function handleOut(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = event.target as HTMLButtonElement;
    target.classList.remove('disable');
  }

  return (
    <div className="pagination-container">
      <button className="pagination-button-left" onClick={startPage} onMouseOver={handleHoverLeft} onMouseOut={handleOut}>
        {`<<`}
      </button>
      <button className="pagination-button-left" onClick={prevPage} onMouseOver={handleHoverLeft} onMouseOut={handleOut}>
        {`<`}
      </button>
      <h3 className="current-page">{checkPage()}</h3>
      <button className="pagination-button-right" onClick={nextPage} onMouseOver={handleHoverRight} onMouseOut={handleOut}>
        {`>`}
      </button>
      <button className="pagination-button-right" onClick={lastPage} onMouseOver={handleHoverRight} onMouseOut={handleOut}>
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
