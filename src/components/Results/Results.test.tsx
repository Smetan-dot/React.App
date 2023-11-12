import Results from './Results';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Planet } from './Results';
import { planets } from '../FakeData/Data';
import { MainContext, AppContext } from '../../context/Context';
import { server } from '../../mocks/server';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error',
  });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

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

  const id = 1;
  const setId = () => {};

  describe('check Results', () => {
    it('render 10 planets and click button', async () => {
      const items = planets;
      render(
        <BrowserRouter>
          <AppContext.Provider value={{ id, setId }}>
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
          </AppContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getAllByText(/Diameter/)).toHaveLength(10);
      await userEvent.click(screen.getAllByText(/Learn more/)[0]);
      expect(screen.findByText(/Surface water/)).toBeDefined();
      cleanup();
    });
    it('render 5 planets and click button', async () => {
      const items = planets;
      const perPage = '5';
      const page = 2;
      render(
        <BrowserRouter>
          <AppContext.Provider value={{ id, setId }}>
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
          </AppContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getAllByText(/Diameter/)).toHaveLength(5);
      await userEvent.click(screen.getAllByText(/Learn more/)[0]);
      expect(screen.findByText(/Surface water/)).toBeDefined();
      cleanup();
    });
    it('render no planets with 10 items', () => {
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
    it('render no planets with 5 items', () => {
      const items: Planet[] = [];
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
      expect(screen.getByText(/Planets not found/)).toBeDefined();
      cleanup();
    });
  });
});
