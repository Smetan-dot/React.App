import Results from './Results';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vitest } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { planets } from '../FakeData/Data';
import { AppContext } from '../../context/Context';
import * as reduxHooks from '../../store/hooks';
import { Provider } from 'react-redux';
import { store } from '../../store';

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

const itemsCount = 0;
const setItemsCount = () => {};
const pagination = false;
const setPagination = () => {};
const id = 1;
const setId = () => {};

describe('check Results', () => {
  it('render no planets', async () => {
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
            <Results />
          </AppContext.Provider>
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getAllByText(/Planets not found/)).toBeDefined();
    cleanup();
  });
});
