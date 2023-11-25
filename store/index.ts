import { configureStore } from '@reduxjs/toolkit';
import { planetsApi } from './api';
import { mainReduser } from './slices';

export const store = configureStore({
  reducer: {
    main: mainReduser,
    planetsApi: planetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(planetsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
