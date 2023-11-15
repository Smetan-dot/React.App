import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
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
