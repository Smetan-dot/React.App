import Card from './Card';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vitest } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { planets } from '../FakeData/Data';
import { AppContext } from '../../context/Context';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store';

const itemsCount = 0;
const setItemsCount = () => {};
const pagination = false;
const setPagination = () => {};
const id = 1;
const setId = vitest.fn();

describe('check Card', () => {
  it('render Card', async () => {
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
            <Card item={planets[0]} />
          </AppContext.Provider>
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Diameter/)).toBeDefined();
    await userEvent.click(screen.getByText(/Learn more/));
    expect(setId).toHaveBeenCalled();
    cleanup();
  });
});
