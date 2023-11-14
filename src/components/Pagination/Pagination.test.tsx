import { BrowserRouter } from 'react-router-dom';
import { it, expect, describe } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('check Pagination', async () => {
  it('check render 4 buttons and select', () => {
    render(
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    );
    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getAllByRole('combobox')).toBeDefined();
    cleanup();
  });
});
