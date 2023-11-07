import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Main from './Layouts/Main';
import Details from './Layouts/Details';
import { AppContext } from './context/Context';

function App() {
  const [id, setId] = useState(1);
  const refWrap = useRef<HTMLDivElement>(null);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ id, setId }}>
        <Routes>
          <Route path="/*" element={<Main />}>
            <Route path="details/*" element={<Details refWrap={refWrap} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}
export default App;
