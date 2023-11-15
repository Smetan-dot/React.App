import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { initialState } from './slices';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getPlanets: build.query({
      query: (page: number) => ({
        url: `/planets/?search=${initialState.value}&page=${page}`,
      }),
    }),
    getDetails: build.query({
      query: (id: number) => ({
        url: `https://swapi.dev/api/planets/${id}`,
      }),
    }),
  }),
});

export const { useGetPlanetsQuery, useGetDetailsQuery } = planetsApi;
