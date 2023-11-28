import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  value: '',
  page: 1,
  count: 1,
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
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
  setCount,
  setValue,
  setMainFlag,
  setDetailsFlag,
} = mainSlice.actions;
export const mainReduser = mainSlice.reducer;
