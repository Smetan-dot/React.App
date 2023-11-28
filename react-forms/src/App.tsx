import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Control from './pages/Control/Control';
import OutControl from './pages/OutControl/OutControl';

function App(props: { init: string }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={props.init} element={<Main />} />
        <Route path="/uncontrol" element={<OutControl />} />
        <Route path="/react-hook-form" element={<Control />} />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
