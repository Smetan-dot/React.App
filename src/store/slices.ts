import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../components/Results/Results';

function checkValue(): string {
  const input = localStorage.getItem('input');
  if (input !== null) return input;
  return '';
}

export const initialState = {
  value: checkValue(),
  page: 1,
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
  items: [] as Planet[],
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
  },
});

export const {
  changeSelect,
  setPage,
  setItems,
  setValue,
  setMainFlag,
  setDetailsFlag,
} = mainSlice.actions;
export const mainReduser = mainSlice.reducer;
