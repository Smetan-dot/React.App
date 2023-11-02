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
    if (props.itemsCount <= 10) return true;
    return button;
  }

  function checkCount2(button: boolean) {
    if (props.page === 1) return true;
    return button;
  }

  function nextPage() {
    loadingData(props.page + 1);
    props.setPage(props.page + 1);
    if (props.page + 1 === Math.ceil(props.itemsCount / 10)) {
      setLast(true);
      setNext(true);
    }
    setFirst(false);
    setPrev(false);
    navigate(`/?search=${props.value}&page=${props.page + 1}`);
  }
  function prevPage() {
    loadingData(props.page - 1);
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
    props.setPage(1);
    setFirst(true);
    setPrev(true);
    setNext(false);
    setLast(false);
    navigate('/?search=${props.value}&page=1');
  }
  function lastPage() {
    loadingData(Math.ceil(props.itemsCount / 10));
    props.setPage(Math.ceil(props.itemsCount / 10));
    setFirst(false);
    setPrev(false);
    setNext(true);
    setLast(true);
    navigate(
      `/?search=${props.value}&page=${Math.ceil(props.itemsCount / 10)}`
    );
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
    </div>
  );
}

export default Pagination;
