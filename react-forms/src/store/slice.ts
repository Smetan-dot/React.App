import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  unControl: {
    name: '',
    age: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    image: '',
    termsFalg: false,
  },
  control: {
    name: '',
    age: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    image: '',
    termsFalg: false,
  },
  countries: [
    'Belarus',
    'Ukraine',
    'Lithuania',
    'Poland',
    'Georgia',
    'Israel',
    'USA',
    'Canada',
    'Germany',
  ],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setNameU(state, action: PayloadAction<string>) {
      state.unControl.name = action.payload;
    },
    setAgeU(state, action: PayloadAction<string>) {
      state.unControl.age = action.payload;
    },
    setEmailU(state, action: PayloadAction<string>) {
      state.unControl.email = action.payload;
    },
    setPasswordU(state, action: PayloadAction<string>) {
      state.unControl.password = action.payload;
    },
    setCountryU(state, action: PayloadAction<string>) {
      state.unControl.country = action.payload;
    },
    setGenderU(state, action: PayloadAction<string>) {
      state.unControl.gender = action.payload;
    },
    setImageU(state, action: PayloadAction<string>) {
      state.unControl.image = action.payload;
    },
    setFlagU(state, action: PayloadAction<boolean>) {
      state.unControl.termsFalg = action.payload;
    },
  },
});

export const {
  setNameU,
  setAgeU,
  setEmailU,
  setPasswordU,
  setCountryU,
  setGenderU,
  setImageU,
  setFlagU,
} = mainSlice.actions;
export const mainReduser = mainSlice.reducer;
