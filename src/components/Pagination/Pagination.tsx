import './Pagination.css';
import { Planet } from '../Results/Results';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pagination(props: {
  url: string;
  value: string;
  setItems: React.Dispatch<React.SetStateAction<Planet[]>>;
  setDataIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  itemsCount: number;
  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPagination: React.Dispatch<React.SetStateAction<boolean>>;
  perPage: string;
  setPerPage: React.Dispatch<React.SetStateAction<string>>;
  loadData: (
    url: string,
    setItems: React.Dispatch<React.SetStateAction<Planet[]>>,
    setDataIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    setItemsCount: React.Dispatch<React.SetStateAction<number>>,
    setPagination: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}) {
  const [first, setFirst] = useState(true);
  const [prev, setPrev] = useState(true);
  const [next, setNext] = useState(false);
  const [last, setLast] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  async function loadingData(page: number) {
    props.setDataIsLoaded(false);
    props.loadData(
      `${props.url}&page=${page}`,
      props.setItems,
      props.setDataIsLoaded,
      props.setItemsCount,
      props.setPagination
    );
  }

  function checkCount(button: boolean) {
    if (props.itemsCount <= Number(props.perPage)) return true;
    return button;
  }

  function checkCount2(button: boolean) {
    if (props.page === 1) return true;
    return button;
  }

  function nextPage() {
    if (props.perPage === '5') {
      if (props.page % 2 === 0) {
        console.log(count);
        loadingData(props.page - count);
        setCount(count + 1);
      }
    } else loadingData(props.page + 1);

    props.setPage(props.page + 1);
    if (
      props.page + 1 ===
      Math.ceil(props.itemsCount / Number(props.perPage))
    ) {
      setLast(true);
      setNext(true);
    }
    setFirst(false);
    setPrev(false);
    navigate(`/?search=${props.value}&page=${props.page + 1}`);
  }

  function prevPage() {
    if (props.perPage === '5') {
      if (props.page % 2 === 1) {
        console.log(count);
        loadingData(props.page - (count + 1));
        setCount(count - 1);
      }
    } else loadingData(props.page - 1);

    props.setPage(props.page - 1);
    if (props.page - 1 === 1) {
      setFirst(true);
      setPrev(true);
    }
    setLast(false);
    setNext(false);
    navigate(`/?search=${props.value}&page=${props.page - 1}`);
  }

  function startPage() {
    loadingData(1);
    setCount(0);
    props.setPage(1);
    setFirst(true);
    setPrev(true);
    setNext(false);
    setLast(false);
    navigate(`/?search=${props.value}&page=1`);
  }

  function lastPage() {
    loadingData(Math.ceil(props.itemsCount / 10));
    setCount(props.itemsCount / 10);
    props.setPage(Math.ceil(props.itemsCount / Number(props.perPage)));
    setFirst(false);
    setPrev(false);
    setNext(true);
    setLast(true);
    navigate(
      `/?search=${props.value}&page=${Math.ceil(
        props.itemsCount / Number(props.perPage)
      )}`
    );
  }

  function handleClick(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setPerPage(event.target.value);
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
      <h3 className="current-page">{props.page}</h3>
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
        defaultValue={props.perPage}
        onChange={handleClick}
      >
        <option value={10}>10</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
}

export default Pagination;
