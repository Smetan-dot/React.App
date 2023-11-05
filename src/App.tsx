import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import Main from './Layouts/Main';
import Details from './Layouts/Details';

function App() {
  const [id, setId] = useState(1);
  const refWrap = useRef<HTMLDivElement>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main setId={setId} />}>
          <Route
            path="details/*"
            element={<Details id={id} refWrap={refWrap} />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
