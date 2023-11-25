import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getPlanets: build.query({
      query: (params: { page: number; value: string }) => ({
        url: `/planets/?search=${params.value}&page=${params.page}`,
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
