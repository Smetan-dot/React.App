import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Planet } from '../../types/types';
import { Provider } from 'react-redux';
import { store } from '../../store';
import * as reduxHooks from '../../store/hooks';

vitest.mock('../../store/hooks');

const initialState = {
  value: '',
  page: 1,
  count: 1,
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
  items: [] as Planet[],
};

describe('check Main', () => {
  it('check rendering heading', async () => {
    vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(initialState);
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('Star Wars Planets')).toBeDefined();
  });

  it('check Loader', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );
    expect(document.querySelector('.loader-container')).toBeDefined();
  });
});
