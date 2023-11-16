import { BrowserRouter } from 'react-router-dom';
import { it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Details from './Details';
import DetailsDesc from '../components/DetailsDesc/DetailsDesc';
import { details } from '../components/FakeData/Data';
import { AppContext, DetailsContext } from '../context/Context';

const id = 1;
const setId = () => {};
const refWrap = {} as React.RefObject<HTMLDivElement>;
const state = details;
const setState = () => {};
const detailsIsLoaded = false;
const setDetailsIsLoaded = () => {};

it('check Loader', async () => {
  render(
    <BrowserRouter>
      <AppContext.Provider value={{ id, setId }}>
        <DetailsContext.Provider
          value={{ state, setState, detailsIsLoaded, setDetailsIsLoaded }}
        >
          <Details refWrap={refWrap}></Details>
        </DetailsContext.Provider>
      </AppContext.Provider>
    </BrowserRouter>
  );
  expect(document.querySelector('.loder-container')).toBeDefined();
  cleanup();
});

it('check Details description', async () => {
  render(
    <BrowserRouter>
      <DetailsContext.Provider
        value={{ state, setState, detailsIsLoaded, setDetailsIsLoaded }}
      >
        <DetailsDesc />
      </DetailsContext.Provider>
    </BrowserRouter>
  );
  expect(screen.getByText(/Surface water/)).toBeDefined();
  cleanup();
});

it('check close-button', async () => {
  render(
    <BrowserRouter>
      <DetailsContext.Provider
        value={{ state, setState, detailsIsLoaded, setDetailsIsLoaded }}
      >
        <DetailsDesc />
      </DetailsContext.Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole('button')).toBeDefined();
  cleanup();
});
