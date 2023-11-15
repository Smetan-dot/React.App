import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  value: '',
  perPage: '10',
  mainFlag: false,
  detailsFlag: false,
  viewMode: 'main',
  page: 1,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeSelect(
      state,
      action: PayloadAction<React.ChangeEvent<HTMLSelectElement>>
    ) {
      state.perPage = action.payload.target.value;
    },
  },
});

export const { changeSelect } = mainSlice.actions;
export const mainReduser = mainSlice.reducer;
