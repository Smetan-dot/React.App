import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useRef } from 'react';
import Main from './Layouts/Main/Main';
import Details from './Layouts/Details/Details';
import { AppContext } from './context/Context';

function App(props: { init: string }) {
  const [id, setId] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [pagination, setPagination] = useState(false);
  const refWrap = useRef<HTMLDivElement>(null);

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          id,
          setId,
          itemsCount,
          setItemsCount,
          pagination,
          setPagination,
        }}
      >
        <Routes>
          <Route path={props.init} element={<Main />}>
            <Route path="details/*" element={<Details refWrap={refWrap} />} />
          </Route>
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
export default App;
