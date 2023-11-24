import Results from './Results';
import { describe, it, expect, vitest } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { planets } from '../FakeData/Data';
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

describe('check Results', () => {
  it('render no planets', async () => {
    vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(initialState);
    render(
      <Provider store={store}>
        <Results />
      </Provider>
    );
    expect(screen.getAllByText(/Planets not found/)).toBeDefined();
    cleanup();
  });
});
