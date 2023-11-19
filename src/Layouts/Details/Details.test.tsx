import { BrowserRouter } from 'react-router-dom';
import { it, expect, vitest } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Details from './Details';
import DetailsDesc from '../../components/DetailsDesc/DetailsDesc';
import { details, planets } from '../../components/FakeData/Data';
import { AppContext, DetailsContext } from '../../context/Context';
import * as reduxHooks from '../../store/hooks';
import { Provider } from 'react-redux';
import { store } from '../../store';

const id = 1;
const setId = () => {};
const itemsCount = 60;
const setItemsCount = () => {};
const pagination = false;
const setPagination = () => {};
const refWrap = {} as React.RefObject<HTMLDivElement>;

const state = details;
const setState = vitest.fn();

vitest.mock('../../store/hooks');

const initialState = {
  value: '',
  page: 1,
  count: 1,
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
  items: planets,
};

it('check Loader', async () => {
  vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(initialState);
  render(
    <BrowserRouter>
      <Provider store={store}>
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
          <DetailsContext.Provider value={{ state, setState }}>
            <Details refWrap={refWrap}></Details>
          </DetailsContext.Provider>
        </AppContext.Provider>
      </Provider>
    </BrowserRouter>
  );
  expect(document.querySelector('.loader-container')).toBeDefined();
  expect(document.querySelector('.loader-item')).toBeDefined();
  cleanup();
});

it('check Details description', async () => {
  render(
    <BrowserRouter>
      <DetailsContext.Provider value={{ state, setState }}>
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
      <DetailsContext.Provider value={{ state, setState }}>
        <DetailsDesc />
      </DetailsContext.Provider>
    </BrowserRouter>
  );
  expect(screen.getByRole('button')).toBeDefined();
  cleanup();
});
