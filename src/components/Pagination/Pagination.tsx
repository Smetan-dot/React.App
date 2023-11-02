import './Pagination.css';
import { Planet } from '../Results/Results';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Pagination(props: {
  url: string;
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

  function nextPage() {
    loadingData(props.page + 1);
    props.setPage(props.page + 1);
    if (props.page + 1 === Math.ceil(props.itemsCount / 10)) {
      setLast(true);
      setNext(true);
    }
    setFirst(false);
    setPrev(false);
    navigate(`/?page=${props.page + 1}`);
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
    navigate(`/?page=${props.page - 1}`);
  }
  function startPage() {
    loadingData(1);
    props.setPage(1);
    setFirst(true);
    setPrev(true);
    setNext(false);
    setLast(false);
    navigate('/?page=1');
  }
  function lastPage() {
    loadingData(Math.ceil(props.itemsCount / 10));
    props.setPage(Math.ceil(props.itemsCount / 10));
    setFirst(false);
    setPrev(false);
    setNext(true);
    setLast(true);
    navigate(`/?page=${Math.ceil(props.itemsCount / 10)}`);
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
        disabled={first}
      >
        {toStart}
      </button>
      <button className="pagination-button" onClick={prevPage} disabled={prev}>
        {toPrev}
      </button>
      <h3 className="current-page">{props.page}</h3>
      <button className="pagination-button" onClick={nextPage} disabled={next}>
        {toNext}
      </button>
      <button className="pagination-button" onClick={lastPage} disabled={last}>
        {toEnd}
      </button>
    </div>
  );
}

export default Pagination;
