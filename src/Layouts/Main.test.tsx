import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// import { userEvent } from '@testing-library/user-event';

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

  //it('check saving in LS', async () => {
  //    render(<BrowserRouter><Main /></BrowserRouter>);
  //    await userEvent.type(document.querySelector('.search-input') as Element, 't');
  //    await userEvent.click(document.querySelector('.search-button') as Element);
  //    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  //})
});
