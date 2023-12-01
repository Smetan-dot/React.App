import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomErrors } from '../types/types';

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
    nameC: '',
    ageC: '',
    emailC: '',
    passwordC: '',
    countryC: '',
    genderC: '',
    imageC: '',
    termsFlagC: false,
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
  errors: {} as CustomErrors,
  style: {
    uncontroll: '',
    control: '',
  },
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
    setErrors(state, action: PayloadAction<CustomErrors>) {
      state.errors = action.payload;
    },
    setNameC(state, action: PayloadAction<string>) {
      state.control.nameC = action.payload;
    },
    setAgeC(state, action: PayloadAction<string>) {
      state.control.ageC = action.payload;
    },
    setEmailC(state, action: PayloadAction<string>) {
      state.control.emailC = action.payload;
    },
    setPasswordC(state, action: PayloadAction<string>) {
      state.control.passwordC = action.payload;
    },
    setCountryC(state, action: PayloadAction<string>) {
      state.control.countryC = action.payload;
    },
    setGenderC(state, action: PayloadAction<string>) {
      state.control.genderC = action.payload;
    },
    setImageC(state, action: PayloadAction<string>) {
      state.control.imageC = action.payload;
    },
    setFlagC(state, action: PayloadAction<boolean>) {
      state.control.termsFlagC = action.payload;
    },
    setStyleU(state, action: PayloadAction<string>) {
      state.style.uncontroll = action.payload;
    },
    setStyleC(state, action: PayloadAction<string>) {
      state.style.control = action.payload;
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
  setErrors,
  setNameC,
  setAgeC,
  setEmailC,
  setPasswordC,
  setCountryC,
  setGenderC,
  setImageC,
  setFlagC,
  setStyleC,
  setStyleU,
} = mainSlice.actions;
export const mainReduser = mainSlice.reducer;
