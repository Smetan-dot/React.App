import { it, expect, vitest } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import DetailsDesc from '../../components/DetailsDesc/DetailsDesc';
import { details } from '../../components/FakeData/Data';
import * as reduxHooks from '../../store/hooks';
import { Provider } from 'react-redux';
import { store } from '../../store';

vitest.mock('../../store/hooks');

const initialState = {
  details: details,
};
vitest.mock('next/router', () => ({
  useRouter() {
    return {
      push: () => null,
      back: () => null,
    };
  },
}));

it('check Details description', async () => {
  const dispatch = vitest.fn();
  vitest.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatch);
  vitest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue(initialState);
  render(
    <Provider store={store}>
      <DetailsDesc />
    </Provider>
  );
  expect(screen.getByText(/Surface water/)).toBeDefined();
  expect(screen.getByRole('button')).toBeDefined();
  fireEvent.click(screen.getByRole('button'));
  expect(dispatch).toHaveBeenCalled();
  cleanup();
});
