import Search from './Search';
import { describe, it, expect, vitest } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Planet } from '../../types/types';
import { Provider } from 'react-redux';
import { store } from '../../store';
import * as reduxHooks from '../../store/hooks';

vitest.mock('../../store/hooks');
vitest.mock('next/router', () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
}));

const initialState = {
  value: '',
  page: 1,
  count: 1,
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
  items: [] as Planet[],
};

describe('check Search', () => {
  it('check rendering and click button', async () => {
    const dispatch = vitest.fn();
    vitest.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatch);
    vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(initialState);
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByText('Search')).toBeDefined();
    fireEvent.click(screen.getByText('Search'));
    expect(dispatch).toHaveBeenCalled();
    cleanup();
  });
});
