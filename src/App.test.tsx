import App from './App';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

it('check 404 page', () => {
  const path = '/bla/bla';
  render(<App init={path} />);
  expect(screen.getByText('Page not found')).toBeDefined();
});
