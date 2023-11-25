import Card from './Card';
import { describe, it, expect, vitest } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { planets } from '../FakeData/Data';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store';
import * as reduxHooks from '../../store/hooks';

vitest.mock('../../store/hooks');

describe('check Card', () => {
  it('render Card', async () => {
    const dispatch = vitest.fn();
    vitest.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Card item={planets[0]} />
      </Provider>
    );
    expect(screen.getByText(/Diameter/)).toBeDefined();
    expect(screen.getByText(/Climate/)).toBeDefined();
    expect(screen.getByText(/Terrain/)).toBeDefined();
    expect(screen.getByText(/Population/)).toBeDefined();
    await userEvent.click(screen.getByText(/Learn more/));
    expect(dispatch).toHaveBeenCalled();
    cleanup();
  });
});
