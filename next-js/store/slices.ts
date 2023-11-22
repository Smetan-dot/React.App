import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet, DetailsPlanet } from '../types/types';

export const initialState = {
  value: '',
  page: 1,
  count: 1,
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
  items: [] as Planet[],
  id: 1,
  itemsCount: 0,
  pagination: false,
  details: {} as DetailsPlanet,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeSelect(state, action: PayloadAction<string>) {
      state.perPage = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setItems(state, action: PayloadAction<Planet[]>) {
      state.items = action.payload;
    },
    setValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setMainFlag(state, action: PayloadAction<boolean>) {
      state.mainFlag = action.payload;
    },
    setDetailsFlag(state, action: PayloadAction<boolean>) {
      state.detailsFlag = action.payload;
    },
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setItemsCount(state, action: PayloadAction<number>) {
      state.itemsCount = action.payload;
    },
    setPagination(state, action: PayloadAction<boolean>) {
      state.pagination = action.payload;
    },
    setDetails(state, action: PayloadAction<DetailsPlanet>) {
      state.details = action.payload;
    },
  },
});

export const {
  changeSelect,
  setPage,
  setCount,
  setItems,
  setValue,
  setMainFlag,
  setDetailsFlag,
  setId,
  setItemsCount,
  setPagination,
  setDetails,
} = mainSlice.actions;
export const mainReduser = mainSlice.reducer;
