import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('check Main', () => {
  it('check rendering heading', async () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    expect(screen.getByText('Star Wars Planets')).toBeDefined();
  });

  it('check Loader', () => {
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
    expect(document.querySelector('.loder-container')).toBeDefined();
  });
});
