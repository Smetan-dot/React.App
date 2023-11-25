import { it, expect, describe, vitest } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
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

describe('check Pagination', async () => {
  it('check 4 buttons and select', async () => {
    const dispatch = vitest.fn();
    vitest.spyOn(reduxHooks, 'useAppSelector');
    vitest.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getAllByRole('combobox')).toBeDefined();
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(dispatch).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[3]);
    expect(dispatch).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(dispatch).toHaveBeenCalled();
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(dispatch).toHaveBeenCalled();
    cleanup();
  });
});
