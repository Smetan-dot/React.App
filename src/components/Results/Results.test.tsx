import Results from './Results';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Planet } from './Results';
import { planets } from '../FakeData/Data';
import { MainContext } from '../../context/Context';

describe('check Results', () => {
  const url = '';
  const setUrl = () => {};
  const setItems = () => {};
  const dataIsLoaded = false;
  const setDataIsLoaded = () => {};
  const value = '';
  const setValue = () => {};
  const page = 1;
  const setPage = () => {};
  const itemsCount = 0;
  const setItemsCount = () => {};
  const perPage = '10';
  const setPerPage = () => {};
  const pagination = false;
  const setPagination = () => {};

  describe('check Results', () => {
    it('render 10 planets', () => {
      const items = planets;
      render(
        <BrowserRouter>
          <MainContext.Provider
            value={{
              url,
              setUrl,
              items,
              setItems,
              dataIsLoaded,
              setDataIsLoaded,
              page,
              setPage,
              itemsCount,
              setItemsCount,
              pagination,
              setPagination,
              value,
              setValue,
              perPage,
              setPerPage,
            }}
          >
            <Results />
          </MainContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getAllByText(/Diameter/)).toHaveLength(10);
      cleanup();
    });
    it('render 5 planets', () => {
      const items = planets;
      const perPage = '5';
      const page = 2;
      render(
        <BrowserRouter>
          <MainContext.Provider
            value={{
              url,
              setUrl,
              items,
              setItems,
              dataIsLoaded,
              setDataIsLoaded,
              page,
              setPage,
              itemsCount,
              setItemsCount,
              pagination,
              setPagination,
              value,
              setValue,
              perPage,
              setPerPage,
            }}
          >
            <Results />
          </MainContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getAllByText(/Diameter/)).toHaveLength(5);
      cleanup();
    });
    it('render no planets', () => {
      const items: Planet[] = [];
      render(
        <BrowserRouter>
          <MainContext.Provider
            value={{
              url,
              setUrl,
              items,
              setItems,
              dataIsLoaded,
              setDataIsLoaded,
              page,
              setPage,
              itemsCount,
              setItemsCount,
              pagination,
              setPagination,
              value,
              setValue,
              perPage,
              setPerPage,
            }}
          >
            <Results />
          </MainContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getByText(/Planets not found/)).toBeDefined();
      cleanup();
    });
  });
});
